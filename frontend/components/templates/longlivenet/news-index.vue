<template>
  <article id="news-index-top-position">
    <div>
      <nav-bread-brumb />
    </div>
    <section>
      <h4 class="section-title"><span>News</span></h4>
      <newses :newses="newses">
        <template #nav>
          <b-link @click="loadMoreNewses(20)">load more news</b-link>
        </template>
      </newses>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import Newses from '@/components/organisms/type1-newses.vue'
import newsHandler from '@/composable/news-handler'

export default defineComponent({
  name: 'LongLivenetNewsIndex',
  components: {
    NavBreadBrumb,
    Newses
  },
  setup() {
    const { newses, loadNewses } = newsHandler()

    onMounted(() => {
      loadNewses()
    })

    const loadMoreNewses = (loadCount: number) => {
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
@import '@/assets/scss/style.scss';

#news-index-top-position {
  padding-top: calc($nav-header-height + 0.4rem);
}

.section-title {
  @include index-section-title;
}
</style>
