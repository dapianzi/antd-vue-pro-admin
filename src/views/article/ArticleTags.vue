<template>
  <page-header-wrapper content="文章标签">
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
    <a-table :columns="columns" :data-source="tags" rowKey="id">
    </a-table>
  </page-header-wrapper>
</template>

<script>
  import { mapState } from 'vuex'

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'count',
      dataIndex: 'count',
      key: 'count'
    }
  ]
  export default {
    name: 'ArticleTags',
    props: {
      showSubmit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        columns
      }
    },
    computed: {
      ...mapState({
        tags: state => state.article.tags
      })
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
