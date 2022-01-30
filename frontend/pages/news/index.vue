<template>
  <article  id="news-index-top-position">
    <div>
      <nav-bread-brumb />
    </div>
    <div>{{ cter }}</div>

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
  setup(_props, ctx) {
    const title = computed(() => 'NEWS')
    const getters = ctx.root.$store.getters

    const cter = computed(() => {
      console.log(ctx.root.$store)
      return getters['test/show']
    })

    return {
      title,
      cter
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
