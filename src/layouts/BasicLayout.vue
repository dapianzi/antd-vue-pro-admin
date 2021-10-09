<template>
  <pro-layout
    :title="title"
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <setting-drawer :settings="settings" @change="handleSettingChange" />
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <div style="margin: -24px -24px 24px -24px; position: relative; line-height: 40px; height:40px; background: #F2F2F2">
      <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="handleMenuEvent" @tabClick="handleMenuEvent">
        <a-tab-pane v-for="tab in tabs" :key="tab.path" :closable="tabs.length > 1">
          <a-dropdown slot="tab" :trigger="['contextmenu']">
            <span :style="{ userSelect: 'none' }">{{ resolveTabTitle(tab) }}</span>
            <a-menu slot="overlay" @click="handleMenuEvent(tab.path, $event.key)">
              <a-menu-item key="closeThat">关闭其他</a-menu-item>
              <a-menu-item key="closeRight">关闭右侧</a-menu-item>
              <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-tab-pane>
      </a-tabs>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </pro-layout>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import LogoSvg from '../assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter
  },
  data () {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // 定宽: true / 流式: false
        contentWidth: defaultSettings.layout === 'sidemenu' ? false : defaultSettings.contentWidth === 'Fixed',
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false,
      activeKey: ''
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters,
      tabs: state => state.app.tabs
    }),
    ...mapGetters(['resolveTabIdx'])
  },
  created () {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
    this.$store.dispatch('initTabs').then(() => {
      console.log('tabs init ok')
    })
  },
  updated () {
    const { name, meta, fullPath } = this.$route
    if (this.$store.getters.resolveTabIdx(fullPath) === -1) {
      this.$store.commit('pushTab', {
        name: name,
        title: meta.title,
        path: fullPath
      })
    }
    this.activeKey = this.$route.fullPath
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    updateTheme(this.settings.primaryColor)
    // first time mounted
    const { name, meta, fullPath } = this.$route
    if (this.$store.getters.resolveTabIdx(fullPath) === -1) {
      this.$store.commit('pushTab', {
        name: name,
        title: meta.title,
        path: fullPath
      })
    }
    this.activeKey = this.$route.fullPath
  },
  methods: {
    ...mapMutations(['removeTab', 'removeThat', 'removeLeft', 'removeRight']),
    i18nRender,
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = false
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value === 'Fixed'
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = false
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = true
          }
          break
      }
    },
    logoRender () {
      return <LogoSvg />
    },
    handleMenuEvent (ctx, action) {
      const thisIdx = this.resolveTabIdx(this.$route.fullPath)
      const thatIdx = this.resolveTabIdx(ctx)
      switch (action) {
        case 'remove': {
          // commit action
          this.removeTab(thatIdx)
          if (thisIdx === thatIdx) {
            this.$router.push({ path: this.tabs.length > thisIdx ? this.tabs[thisIdx].path : this.tabs[thisIdx - 1].path })
          }
          break
        }
        case 'closeThat': {
          this.removeThat(thatIdx)
          if (thisIdx !== thatIdx) {
            this.$router.push({ path: ctx })
          }
          break
        }
        case 'closeLeft': {
          // commit action
          this.removeLeft(thatIdx)
          if (thisIdx < thatIdx) {
            this.$router.push({ path: ctx })
          }
          break
        }
        case 'closeRight': {
          // commit action
          this.removeRight(thatIdx)
          if (thisIdx > thatIdx) {
            this.$router.push({ path: ctx })
          }
          break
        }
        default: {
          // click
          this.$router.push({ path: ctx })
        }
      }
    },
    resolveTabTitle (tab) {
      return i18nRender(tab.title) + tab.name
    }
  }
}
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
