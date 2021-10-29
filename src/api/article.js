import request from '@/utils/request'

const api = {
  article: '/articles',
  tag: '/tags'
}

export default api

export function getArticles(parameter) {
  return request({
    url: api.article,
    method: 'get',
    params: parameter
  })
}

export function getArticle(id, parameter) {
  return request({
    url: `${api.article}/${id}`,
    method: 'get',
    params: parameter
  })
}

export function createArticle(data) {
  return request({
    url: api.article,
    method: 'post',
    data: data
  })
}

export function modifyArticle(id, parameter) {
  return request({
    url: `${api.article}/${id}`,
    method: 'put',
    data: parameter
  })
}

export function articleState(id, parameter) {
  return request({
    url: `${api.article}/${id}`,
    method: 'patch',
    data: parameter
  })
}

export function deleteArticle(id) {
  return request({
    url: `${api.article}/${id}`,
    method: 'delete'
  })
}

export function getTags() {
  return request({
    url: api.tag,
    method: 'get'
  })
}

export function setTag(id, tag) {
  return request({
    url: `${api.tag}/${id}`,
    method: 'put',
    data: { name: tag }
  })
}

export function createTag(tag) {
  return request({
    url: api.tag,
    method: 'post',
    data: { name: tag }
  })
}

export function deleteTag(id) {
  return request({
    url: `${api.article}/${id}`,
    method: 'delete'
  })
}
