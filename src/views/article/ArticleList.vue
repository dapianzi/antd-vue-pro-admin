<template>
  <page-header-wrapper content="文章随笔">
    <!--    <a-list item-layout="vertical" :data-source="showArticles" size="large"-->
    <!--            :pagination="{showQuickJumper: true, current: page, pageSize: pageSize, total: total, onChange: onChange}">-->
    <!--      <div slot="footer">-->
    <!--        footer part-->
    <!--      </div>-->
    <!--      <a-list-item slot="renderItem" slot-scope="item">-->
    <!--        &lt;!&ndash;        <template slot="actions">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <span><a-icon type="star-o" class="mr-2"></a-icon>14</span>&ndash;&gt;-->
    <!--        &lt;!&ndash;          <span><a-icon type="like-o" class="mr-2"></a-icon>30</span>&ndash;&gt;-->
    <!--        &lt;!&ndash;          <span><a-icon type="message" class="mr-2"></a-icon>2</span>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </template>&ndash;&gt;-->
    <!--        &lt;!&ndash;        <img v-if="!!item.cover" slot="extra" width="272" alt="cover" :src="item.cover"/>&ndash;&gt;-->
    <!--        <a-list-item-meta-->
    <!--          :description="item.description"-->
    <!--        >-->
    <!--          <a slot="title" :href="'/article/edit/'+item.id">{{ item.title }}</a>-->
    <!--          &lt;!&ndash;          <a-avatar slot="avatar" :src="item.avatar"/>&ndash;&gt;-->
    <!--        </a-list-item-meta>-->
    <!--        {{ item.content }}-->
    <!--      </a-list-item>-->
    <!--    </a-list>-->
    <a-table :columns="columns" :data-source="articles" rowKey="id">
      <template slot="articleTitle" slot-scope="text, record">
        <router-link :to="editRecord(record)">{{ text }}</router-link>
      </template>
      <span slot="customTitle"><a-icon type="smile-o"/> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <router-link :to="editRecord(record)">Modify</router-link>
        <a-divider type="vertical"/>
        <a-button type="danger" @click="deleteRecord(record)">Delete</a-button>
      </span>
    </a-table>
  </page-header-wrapper>
</template>

<script>
  import { getArticles, deleteArticle } from '@/api/article'
  import { baseMixin } from '@/store/app-mixin'
  import FooterToolBar from '@/components/FooterToolbar'

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      scopedSlots: { customRender: 'articleTitle' }
    },
    {
      title: 'Published',
      dataIndex: 'published_at',
      key: 'published'
    },
    {
      title: 'Modified',
      dataIndex: 'updated_at',
      key: 'modified'
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'RepositoryForm',
    mixins: [baseMixin],
    components: {
      FooterToolBar
    },
    props: {
      showSubmit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        page: 1,
        total: 0,
        pageSize: 10,
        columns,
        articles: []
      }
    },
    computed: {
      showArticles() {
        return this.articles.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
      }
    },
    methods: {
      getList(param) {
        getArticles(param).then((data) => {
          this.articles = data.result
          this.total = data.result.length
        })
      },
      onChange(page) {
        this.page = page
      },
      editRecord(record) {
        return this.$router.resolve({ name: 'ArticleEdit', params: { id: record.id } }).href
      },
      deleteRecord(record) {
        deleteArticle(record.id).then(res => {
          const idx = this.articles.findIndex(item => item.id === record.id)
          this.articles.splice(idx, 1)
          // this.$set('articles', this.articles)
        })
      }
    },
    updated() {
    },
    mounted() {
      const { query } = this.$route
      this.getList(query)
    }
  }
</script>

<style scoped>

</style>
