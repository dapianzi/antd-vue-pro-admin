<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">AntD-Vue-Pro</a>
      <a href="https://www.github.com/dapianzi/" target="_blank">Github</a>
    </template>
    <template v-slot:copyright>
      <a href="https://www.dapianzi.me/" target="_blank">DAPIANZI BOT</a>
    </template>
  </global-footer>
</template>

<script>
  import { GlobalFooter } from '@ant-design-vue/pro-layout'

  export default {
    name: 'ProGlobalFooter',
    components: {
      GlobalFooter
    }
  }
</script>
