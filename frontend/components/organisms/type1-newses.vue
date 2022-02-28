<template>
  <contents-card>
    <contents-card-body>
      <news-list :newses="newses">
        <template #editActivator="{ news }">
          <content-edit-activator
            type="news"
            :content-id="news.id"
            size="1.6rem"
            class="mr-2"
          />
        </template>
      </news-list>

      <div class="type1-newses__action">
        <slot name="action">
          <b-link @click="loadMoreNewses">load more news</b-link>
        </slot>
      </div>
    </contents-card-body>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import NewsList from '@/components/molecules/news-list.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'
import newsHandler from '@/composable/news-handler'

export default defineComponent({
  name: 'Type1Newses',
  components: {
    ContentsCard,
    ContentsCardBody,
    NewsList,
    ContentEditActivator
  },
  setup() {
    const { newses, loadNewses } = newsHandler()

    onMounted(() => {
      loadNewses()
    })

    const loadMoreNewses = (loadCount: number = 20) => {
      loadNewses(loadCount)
    }

    return {
      newses,
      loadMoreNewses,
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
