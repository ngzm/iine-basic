<template>
  <contents-card :overlay="loading">
    <contents-card-body>
      <news-list :newses="newsList">
        <template #editActivator="{ news }">
          <content-edit-activator
            :type="types.news"
            :action="actions.moddel"
            :content-id="news.id"
            size="1.6rem"
            class="mr-2"
          />
        </template>
      </news-list>
      <div class="type1-newses__action">
        <slot name="action">
          <b-link @click="loadMoreNewsList()">load more news</b-link>
        </slot>
      </div>
    </contents-card-body>
    <template #editActivator>
      <content-edit-activator :type="types.news" :action="actions.create" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { contentDataTypes, contentActionTypes } from '@/composable/content-helper'
import { useStoreNewsList } from '@/composable/use-news-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import NewsList from '@/components/molecules/news-list.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Newses',
  components: {
    ContentsCard,
    ContentsCardBody,
    NewsList,
    ContentEditActivator
  },
  setup() {
    const { newsList, loading, loadNewsList, loadMoreNewsList } = useStoreNewsList(1, 5)

    onMounted(() => {
      loadNewsList()
    })

    return {
      newsList,
      loading,
      loadMoreNewsList,
      types: contentDataTypes,
      actions: contentActionTypes,
    }
  }
})
</script>

<style lang="scss" scoped>
.type1-newses {
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
}
</style>
