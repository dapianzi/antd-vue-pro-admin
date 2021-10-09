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
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.antd': 'ant design vue',
  'menu.dashboard.antdpro': 'antd pro',
  'menu.dashboard.workplace': '工作台'
}

export default {
  ...components,
  ...locale
}
