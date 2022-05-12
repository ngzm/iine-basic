<template>
  <contents-card :overlay="loading || notFound">
    <contents-card-body class="type1-newses">
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

    <template v-if="!notFound" #editActivator>
      <content-edit-activator :type="types.news" :action="actions.create" />
    </template>

    <template v-if="notFound" #overlay>
      <div class="text-center">
        <h4 class="my-3">情報が登録されていません</h4>
        <p class="my-3">情報を登録してください</p>
        <content-edit-activator
          :type="types.news"
          :action="actions.create"
          button
        />
      </div>
    </template>
  </contents-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import {
  contentDataTypes,
  contentActionTypes,
} from '@/composable/content-helper'
import { useNewsList } from '@/composable/use-news-data'
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
    ContentEditActivator,
  },
  props: {
    limit: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const { newsList, loading, notFound, loadNewsList, listLimit } =
      useNewsList()

    onMounted(async () => {
      listLimit.value = props.limit
      await loadNewsList()
    })

    const loadMoreNewsList = async () => {
      listLimit.value += props.limit
      await loadNewsList()
    }

    return {
      newsList,
      loading,
      notFound,
      loadMoreNewsList,
      types: contentDataTypes,
      actions: contentActionTypes,
    }
  },
})
</script>

<style lang="scss" scoped>
.type1-newses {
  min-height: 16rem;
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
}
</style>
