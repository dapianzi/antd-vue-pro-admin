import { getTags, setTag, deleteTag, createTag } from '@/api/article'

import {
  SET_TAGS,
  SET_CATEGORY
} from '@/store/mutation-types'

const article = {
  state: {
    categories: [],
    tags: []
  },
  getters: {},
  mutations: {
    [SET_CATEGORY]: (state, categories) => {
      state.categories = categories
    },
    [SET_TAGS]: (state, tags) => {
      state.tags = tags
    }
  },
  actions: {
    initCategory({ commit }, categories) {
      return new Promise((resolve, reject) => {
        if (typeof categories !== 'object') {
          reject(new Error('can not set article categories, expected type "object"'))
        } else {
          commit(SET_CATEGORY, categories)
          resolve()
        }
      })
    },
    initTags({ commit }) {
      return getTags().then((data) => {
        const tags = data.result
        if (typeof tags !== 'object') {
          throw new Error('can not set article categories, expected type "array"')
        } else {
          commit(SET_TAGS, tags)
          return tags
        }
      })
    },
    addTag({ commit, state }, tag) {
      return createTag(tag).then(res => {
        const { id, name } = res.result
        const tags = state.tags
        tags.push({ id, name })
        commit(SET_TAGS, tags)
        return { id, name }
      })
    },
    delTag({ commit, state }, id) {
      const tags = state.tags
      delete tags[id]
      commit(SET_TAGS, tags)
    },
    setTag({ commit, state }, id, tag) {
      return new Promise((resolve, reject) => {
        const tags = state.tags
        tags[id] = tag
        commit(SET_TAGS, tags)
        resolve()
      })
    },
    addCategory({ commit }, tags) {
      return new Promise((resolve, reject) => {
        if (typeof tags !== 'object') {
          reject(new Error('can not set article categories, expected type "array"'))
        } else {
          commit(SET_TAGS, tags)
          resolve()
        }
      })
    },
    setCategory({ commit }, tags) {
      return new Promise((resolve, reject) => {
        if (typeof tags !== 'object') {
          reject(new Error('can not set article categories, expected type "array"'))
        } else {
          commit(SET_TAGS, tags)
          resolve()
        }
      })
    },
    delCategory({ commit }, tags) {
      return new Promise((resolve, reject) => {
        if (typeof tags !== 'object') {
          reject(new Error(' can not set article categories, expected type "array"'))
        } else {
          commit(SET_TAGS, tags)
          resolve()
        }
      })
    }
  }
}

export default article
