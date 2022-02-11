<template>
  <article id="news-id-article-top">
    <div>
      <nav-bread-brumb />
    </div>
    <section>
      <h4 class="news-id__header"><span>News</span></h4>
      <news-detail :news="news">
        <template #nav>
          <contact-navigator :contact="contact" class="news-id__navigation" />
        </template>
      </news-detail>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute } from '@nuxtjs/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import NewsDetail from '@/components/organisms/type1-news-detail.vue'
import ContactNavigator from '@/components/molecules/contact-navigator.vue'
import newsHandler from '@/composable/news-handler'
import contactHandler from '@/composable/contact-handler'

export default defineComponent({
  name: 'LongLivenetNewsId',
  components: {
    NavBreadBrumb,
    NewsDetail,
    ContactNavigator
  },
  setup() {
    const id = parseInt(useRoute().value.params.id)
    const { news, loadNews } = newsHandler()
    const { contact, loadContact } = contactHandler()

    onMounted(() => {
      loadNews(id)
      loadContact()
    })

    return {
      news,
      contact
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

#news-id-article-top {
  padding-top: calc($nav-header-height + 0.4rem);
}

.news-id {
  &__header {
    @include index-section-title;
  }
  &__navgation {
    margin-top: 1.5rem;
  }
}
</style>
