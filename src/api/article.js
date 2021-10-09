import request from '@/utils/request'

const api = {
  article: '/articles',
  // modify: '/articles/patch',
  // delete: '/articles/delete',
  // list: '/articles/list',
  tag: '/tags'
  // addTag: '/tags/tags',
  // editTag: '/tags/tags',
  // delTag: '/tags/tags',
  // permission: '/permission',
  // permissionNoPager: '/permission/no-pager',
  // orgTree: '/org/tree'
}

export default api

export function getArticles (parameter) {
  return request({
    url: api.article,
    method: 'get',
    params: parameter
  })
}
export function getArticle (id, parameter) {
  return request({
    url: `${api.article}/${id}`,
    method: 'get',
    params: parameter
  })
}
export function createArticle (parameter) {
  return request({
    url: api.article,
    method: 'post',
    params: parameter
  })
}
export function modifyArticle (id, parameter) {
  return request({
    url: `${api.article}/${id}`,
    method: 'put',
    params: parameter
  })
}
export function articleState (id, parameter) {
  return request({
    url: `${api.article}/${id}`,
    method: 'patch',
    params: parameter
  })
}
export function deleteArticle (id) {
  return request({
    url: `${api.article}/${id}`,
    method: 'delete'
  })
}

// export function getRoleList (parameter) {
//   return request({
//     url: api.role,
//     method: 'get',
//     params: parameter
//   })
// }
//
// export function getServiceList (parameter) {
//   return request({
//     url: api.service,
//     method: 'get',
//     params: parameter
//   })
// }
//
// export function getPermissions (parameter) {
//   return request({
//     url: api.permissionNoPager,
//     method: 'get',
//     params: parameter
//   })
// }
//
// export function getOrgTree (parameter) {
//   return request({
//     url: api.orgTree,
//     method: 'get',
//     params: parameter
//   })
// }
//
// // id == 0 add     post
// // id != 0 update  put
// export function saveService (parameter) {
//   return request({
//     url: api.service,
//     method: parameter.id === 0 ? 'post' : 'put',
//     data: parameter
//   })
// }
//
// export function saveSub (sub) {
//   return request({
//     url: '/sub',
//     method: sub.id === 0 ? 'post' : 'put',
//     data: sub
//   })
// }
