<template>
  <article id="news-index-top-position">
    <div>
      <nav-bread-brumb />
    </div>
    <section>
      <h4 class="section-title"><span>News</span></h4>
      <news-detail :news="news">
      </news-detail>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute } from '@nuxtjs/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import NewsDetail from '@/components/organisms/type1-news-detail.vue'
import newsHandler from '@/composable/news-handler'

export default defineComponent({
  name: 'LongLivenetNewsIndex',
  components: {
    NavBreadBrumb,
    NewsDetail
  },
  setup() {
    const id = parseInt(useRoute().value.params.id)
    const { news, loadNews } = newsHandler()

    onMounted(() => {
      loadNews(id)
    })

    return {
      news,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

#news-index-top-position {
  padding-top: calc($nav-header-height + 0.4rem);
}

.section-title {
  @include index-section-title;
}
</style>
