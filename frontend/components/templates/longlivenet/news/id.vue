<template>
  <article id="news-id-article-top">
    <nav-bread-brumb />
    <section class="news-id-detail">
      <h4 class="news-id-detail__header"><span>News</span></h4>
      <news-detail :news-id="newsId" />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, readonly, useRoute } from '@nuxtjs/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import NewsDetail from '@/components/organisms/type1-news-detail.vue'

export default defineComponent({
  name: 'LongLivenetNewsId',
  components: {
    NavBreadBrumb,
    NewsDetail,
  },
  setup() {
    const newsId = readonly(ref(parseInt(useRoute().value.params.id)))
    return { newsId }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

#news-id-article-top {
  padding-top: calc($nav-header-height + 0.4rem);
}

.news-id-detail {
  &__header {
    @include index-section-title;
  }
}
</style>
