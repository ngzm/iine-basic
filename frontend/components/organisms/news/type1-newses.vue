<template>
  <contents-card :overlay="loading || notFound">
    <contents-card-body class="type1-newses">
      <contets-list :contents="newsList">
        <template #default="{ content }">
          <div class="news-item">
            <div class="news-item__header">
              <span>{{ jstDateString(content.publishOn) }}</span>
              <news-category-badge :category="content.category" class="ml-2" />
            </div>
            <div class="news-item__title">
              <nuxt-link :to="`/news/${content.id}`">
                {{ content.title }}
              </nuxt-link>
            </div>
          </div>
        </template>
        <template #editActivator="{ content }">
          <content-edit-activator
            :edit-props="{
              type: types.news,
              action: actions.moddel,
              id: content.id,
            }"
            size="1.6rem"
            class="mr-2"
          />
        </template>
      </contets-list>

      <div class="type1-newses__action">
        <slot name="action">
          <b-link @click="loadMoreNewsList()">load more news</b-link>
        </slot>
      </div>
    </contents-card-body>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator
        :edit-props="{
          type: types.news,
          action: actions.create,
        }"
      />
    </template>

    <template v-if="notFound" #overlay>
      <content-notfound :type="types.news" />
    </template>
  </contents-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { formatLocalDate } from '@/utils/common-utils'
import { editTypes, editActions } from '@/composable/use-edit-controll'
import { useNewsList } from '@/composable/use-news-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import ContetsList from '@/components/molecules/contents-list.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'
import ContentNotfound from '@/components/molecules/edit/content-notfound.vue'
import NewsCategoryBadge from '@/components/organisms/news/news-category-badge.vue'

export default defineComponent({
  name: 'Type1Newses',
  components: {
    ContentsCard,
    ContentsCardBody,
    ContetsList,
    ContentEditActivator,
    ContentNotfound,
    NewsCategoryBadge,
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

    const jstDateString = (pdate: Date) => formatLocalDate(pdate, 'YYYY/MM/DD')

    return {
      newsList,
      loading,
      notFound,
      loadMoreNewsList,
      jstDateString,
      types: editTypes,
      actions: editActions,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.type1-newses {
  min-height: 16rem;
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
  .news-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    &__header {
      padding: 0.2rem;
      text-align: center;
      width: 14rem;
      min-width: 14rem;
      background-color: #ccccff;
    }
    &__title {
      padding: 0.2rem;
      margin-left: 0.5rem;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .type1-newses .news-item {
    flex-flow: column;
    align-items: stretch;
    padding: 0 0 0.6rem 0.3rem;
  }
}
</style>
