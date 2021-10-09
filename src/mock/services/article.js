import Mock from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack'
]

const authors = [
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', owner: '附小小' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', owner: '吴加好' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', owner: '周星星' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', owner: '林东东' },
  { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', owner: '曲丽丽' }
]

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png'
]

const content = '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。'
const description = '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
const href = 'https://ant.design'

const count = 100
const data = []
for (let i = 0; i < count; i++) {
  const tmpKey = i + 1
  const num = parseInt(Math.random() * (4 + 1), 10)
  data.push({
    id: tmpKey,
    avatar: authors[num].avatar,
    owner: authors[num].owner,
    content: content,
    star: Mock.mock('@integer(1, 999)'),
    percent: Mock.mock('@integer(1, 999)'),
    like: Mock.mock('@integer(1, 999)'),
    message: Mock.mock('@integer(1, 999)'),
    description: description,
    href: href,
    title: titles[i % 8],
    updatedAt: Mock.mock('@datetime'),
    members: [
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
        name: '曲丽丽',
        id: 'member1'
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
        name: '王昭君',
        id: 'member2'
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        name: '董娜娜',
        id: 'member3'
      }
    ],
    activeUser: Math.ceil(Math.random() * 100000) + 100000,
    newUser: Math.ceil(Math.random() * 1000) + 1000,
    cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)]
  })
}
const getArticles = (options) => {
  const queryString = getQueryParameters(options)
  const limit = queryString.limit || 10
  let offset = queryString.offset || 0
  const page = queryString.page || 1
  offset = (page - 1) * limit + offset
  return builder(data.slice(offset, offset + limit))
}
const getArticle = (options) => {
  const id = Math.floor(Math.random() * data.length)
  return builder(data[id])
}
const createArticle = (options) => {
  const n = Math.floor(Math.random() * authors.length)
  const tmp = {
    id: data.length,
    avatar: authors[n].avatar,
    owner: authors[n].owner,
    content: content,
    star: Mock.mock('@integer(1, 999)'),
    percent: Mock.mock('@integer(1, 999)'),
    like: Mock.mock('@integer(1, 999)'),
    message: Mock.mock('@integer(1, 999)'),
    description: description,
    href: href,
    title: titles[data.length % 8],
    updatedAt: Mock.mock('@datetime'),
    members: [
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
        name: '曲丽丽',
        id: 'member1'
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
        name: '王昭君',
        id: 'member2'
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        name: '董娜娜',
        id: 'member3'
      }
    ],
    activeUser: Math.ceil(Math.random() * 100000) + 100000,
    newUser: Math.ceil(Math.random() * 1000) + 1000,
    cover: parseInt(data.length / 4, 10) % 2 === 0 ? covers[data.length % 4] : covers[3 - (data.length % 4)]
  }
  data.push(tmp)
  return builder(tmp)
}
const updateArticle = (options) => {
  const postData = getBody(options)
  const id = Math.floor(Math.random() * data.length)
  data[id] = Object.assign(data[id], postData)
  return builder(data[id])
}
const modifyArticle = (options) => {
  const postData = getBody(options)
  const id = Math.floor(Math.random() * data.length)
  data[id] = Object.assign(data[id], postData)
  return builder(data[id])
}
const deleteArticle = (options) => {
  const id = Math.floor(Math.random() * data.length)
  data.splice(id)
  return builder(id)
}

Mock.mock(/\/articles/, 'get', getArticles)
Mock.mock(/\/articles/, 'post', createArticle)
Mock.mock(/\/articles\/(\d+)/, 'get', getArticle)
Mock.mock(/\/articles\/(\d+)/, 'put', updateArticle)
Mock.mock(/\/articles\/(\d+)/, 'patch', modifyArticle)
Mock.mock(/\/articles\/(\d+)/, 'delete', deleteArticle)
