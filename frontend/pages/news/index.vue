<template>
  <article  id="news-index-top-position">
    <div>
      <nav-bread-brumb />
    </div>

    <section id="news-grid-section">
      <h4 class="section-title">
        <span>{{ title }}</span>
      </h4>
      <news-catalog />
    </section>
  </article>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import NewsCatalog from '@/components/organisms/news/news-catalog.vue'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    NavBreadBrumb,
    NewsCatalog
  },
  setup() {
    const title = computed(() => 'NEWS')

    return {
      title
    }
    
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
