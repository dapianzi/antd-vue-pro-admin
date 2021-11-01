<template>
  <page-header-wrapper content="">
    <a-form ref="modify" @submit="validate" :form="form" class="form">
      <a-form-item
        :label="formLabel.title"
      >
        <a-input
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '文章标题不能为空' }] },
          ]"
          placeholder="文章标题"
        />
      </a-form-item>
      <a-form-item
        :label="formLabel.content"
      >
        <a-textarea class="" :auto-size="{ minRows: 30 }"
                    v-decorator="[
                      'content',
                      { rules: [{ required: true, message: '文章内容不能为空' }] },
                    ]"
                    placeholder="写点什么吧》。"
        />
      </a-form-item>
      <a-form-item>
        <a-checkbox v-decorator="['commentAble', {valuePropName: 'checked'}]">
          {{ formLabel.commentAble }}
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-checkable-tag color="cyan" v-for="tag in tags" :key="tag.id" v-model="tagChecked[tag.id]"
                         @change="handleToggleTag($event, tag.id)">
          {{ tag.name }}
        </a-checkable-tag>
        <a-input
          v-if="newTagVisible"
          ref="newTag"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="newTagValue"
          @change="handleNewTagChange"
          @blur="handleNewTagConfirm"
          @keyup.enter="handleNewTagConfirm"
        />
        <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showNewTagInput">
          <a-icon type="plus"/>
          New Tag
        </a-tag>
      </a-form-item>
      <a-form-item>
        <a-button htmlType="button" @click="handleSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
    <!-- fixed footer toolbar -->
    <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
      <span class="popover-wrapper">
        <a-popover title="表单校验信息" overlayClassName="antd-pro-pages-forms-style-errorPopover" trigger="click"
                   :getPopupContainer="trigger => trigger.parentNode">
          <template slot="content">
            <li v-for="item in errors" :key="item.key" @click="scrollToField(item.key)"
                class="antd-pro-pages-forms-style-errorListItem">
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon"/>
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
            <a-icon type="exclamation-circle"/>{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <a-button type="primary" @click="validate" :loading="loading">发布</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import { mapState, mapActions } from 'vuex'
  import { modifyArticle, getArticle } from '@/api/article'

  const fieldLabels = {
    title: '标题',
    content: '内容',
    category: '文章分类',
    tags: '标签',
    commentAble: '开放评论',
    book: '系列'
  }

  export default {
    name: 'ArticleEdit',
    mixins: [baseMixin],
    components: {
      FooterToolBar
    },
    data() {
      return {
        id: 0,
        form: this.$form.createForm(this),
        formLabel: fieldLabels,
        loading: false,
        memberLoading: false,
        newTagVisible: false,
        newTagValue: '',
        tagChecked: [],
        errors: []
      }
    },
    mounted() {
      this.id = this.$route.params.id
      getArticle(this.id).then(res => {
        this.form.setFields({
          title: { value: res.result.title },
          content: { value: res.result.content }
        })
        this.tagChecked = Object.fromEntries(Array.from(res.result.tags, i => [i.id, true]))
      })
    },
    computed: {
      ...mapState({
        tags: state => state.article.tags
      })
    },
    methods: {
      ...mapActions(['addTag']),
      handleSubmit() {
        const checked = []
        for (const i in this.tagChecked) {
          if (this.tagChecked[i]) {
            checked.push(i)
          }
        }
        const data = {
          ...this.form.getFieldsValue(),
          tags: checked.join(',')
        }
        modifyArticle(this.id, data).then((res) => {
          console.log(res)
          this.$router.go(0)
        }).catch(e => {
          alert(e.error || e)
        })
      },
      handleToggleTag(checked, key) {
        console.log(key)
      },
      handleNewTagChange(e) {
        this.newTagValue = e.target.value
      },
      handleNewTagConfirm() {
        const tag = this.newTagValue
        this.addTag(tag).then((res) => {
          console.log(res)
        }).finally(() => {
          Object.assign(this, {
            newTagValue: '',
            newTagVisible: false
          })
        })
      },
      showNewTagInput() {
        this.newTagVisible = true
        this.$nextTick(function() {
          this.$refs.newTag.focus()
        })
      },
      // 最终全页面提交
      validate() {
        const { $refs: { modify }, $notification } = this
        modify.form.validateFields((err, values) => {
          // clean this.errors
          this.errors = []
          if (err) {
            const errors = Object.assign({}, modify.form.getFieldsError())
            const tmp = { ...errors }
            this.errorList(tmp)
            return
          }
          this.handleSubmit()
        })
      },
      errorList(errors) {
        if (!errors || errors.length === 0) {
          return
        }
        this.errors = Object.keys(errors)
          .filter(key => errors[key])
          .map(key => ({
            key: key,
            message: errors[key][0],
            fieldLabel: fieldLabels[key]
          }))
      },
      scrollToField(fieldKey) {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
        if (labelNode) {
          labelNode.scrollIntoView(true)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .card {
    margin-bottom: 24px;
  }

  .popover-wrapper {
    /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }

  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;

    i {
      margin-right: 4px;
    }
  }

  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }

    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }

    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0, 0, 0, .45);
      font-size: 12px;
    }
  }
</style>
