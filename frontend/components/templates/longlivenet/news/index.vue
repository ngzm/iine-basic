<template>
  <article id="news-index-top-position">
    <bread-crumb-nav />
    <section>
      <h4 class="section-title"><span>News</span></h4>
      <newses />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BreadCrumbNav from '@/components/molecules/bread-crumb-nav.vue'
import Newses from '@/components/organisms/news/type1-newses.vue'

export default defineComponent({
  name: 'LongLivenetNewsIndex',
  components: {
    BreadCrumbNav,
    Newses
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

#news-index-top-position {
  @include page-article-gap;
}

.section-title {
  @include index-section-title;
}
</style>
