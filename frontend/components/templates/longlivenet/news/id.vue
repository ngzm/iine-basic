<template>
  <article id="news-id-article-top">
    <bread-crumb-nav />
    <section class="news-id-detail">
      <h4 class="news-id-detail__header"><span>News</span></h4>
      <news-detail :news-id="newsId" />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, readonly, useRoute } from '@nuxtjs/composition-api'
import BreadCrumbNav from '@/components/molecules/bread-crumb-nav.vue'
import NewsDetail from '@/components/organisms/type1-news-detail.vue'

export default defineComponent({
  name: 'LongLivenetNewsId',
  components: {
    BreadCrumbNav,
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
