<template>
  <contents-card>
    <template #default>
      <news-list :newses="newses" />
      <div class="type1-newses__action">
        <slot name="action">
          <b-link @click="loadMoreNewses">load more news</b-link>
        </slot>
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import NewsList from '@/components/molecules/news-list.vue'
import newsHandler from '@/composable/news-handler'

export default defineComponent({
  name: 'Type1Newses',
  components: {
    ContentsCard,
    NewsList
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
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
