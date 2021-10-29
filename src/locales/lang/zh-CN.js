import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '概览',
  'menu.dashboard.analysis': '活动分析',
  'menu.dashboard.workplace': '工作台',
  'menu.article': '文章随笔',
  'menu.article.new': '写点什么',
  'menu.article.edit': '编辑文章',
  'menu.article.list': '历史发布',
  'menu.article.tags': '标签分类'
}

export default {
  ...components,
  ...locale
}
