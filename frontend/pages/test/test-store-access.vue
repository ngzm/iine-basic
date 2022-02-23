<template>
  <article id="news-index-top-position">
    <div>
      <bread-crumb-nav />
    </div>
    <div>{{ cter }}</div>

    <section id="news-grid-section">
      <h4 class="section-title">
        <span>{{ title }}</span>
      </h4>
    </section>
  </article>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BreadCrumbNav from '@/components/molecules/bread-crumb-nav.vue'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    BreadCrumbNav,
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
