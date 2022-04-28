<template>
  <article id="news-id-article-top">
    <section class="news-id-detail">
      <h4 class="news-id-detail__header">
        <span>News</span>
      </h4>
      <news-detail :content-id="newsId" />
    </section>
  </article>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  readonly,
  useRoute,
} from '@nuxtjs/composition-api'
import NewsDetail from '@/components/organisms/news/type1-news-detail.vue'

export default defineComponent({
  name: 'LongLivenetNewsId',
  components: { NewsDetail },
  setup() {
    const newsId = readonly(ref(parseInt(useRoute().value.params.id)))
    return { newsId }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

#news-id-article-top {
  @include page-article-gap;
}

.news-id-detail {
  &__header {
    @include index-section-title;
  }
}
</style>
