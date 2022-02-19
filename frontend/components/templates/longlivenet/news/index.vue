<template>
  <article id="news-index-top-position">
    <nav-bread-brumb />
    <section>
      <h4 class="section-title"><span>News</span></h4>
      <newses />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import Newses from '@/components/organisms/type1-newses.vue'

export default defineComponent({
  name: 'LongLivenetNewsIndex',
  components: {
    NavBreadBrumb,
    Newses
  },
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
