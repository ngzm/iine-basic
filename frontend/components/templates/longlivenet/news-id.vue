<template>
  <article id="news-id-article-top">
    <div>
      <nav-bread-brumb />
    </div>
    <section class="news-id-detail">
      <h4 class="news-id-detail__header"><span>News</span></h4>
      <news-detail :news-id="newsId">
        <template #nav>
        </template>
      </news-detail>
    </section>

    <aside class="news-id-aside">
      <h5 class="news-id-aside__header">
        お問い合せ
        <b-icon icon="hand-index" />
      </h5>
      <nav-contact :contact="contact" />
    </aside>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute } from '@nuxtjs/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import NewsDetail from '@/components/organisms/type1-news-detail.vue'
import NavContact from '~/components/organisms/type2-nav-contact.vue'
import newsHandler from '@/composable/news-handler'
import contactHandler from '@/composable/contact-handler'


export default defineComponent({
  name: 'LongLivenetNewsId',
  components: {
    NavBreadBrumb,
    NewsDetail,
    NavContact
  },
  setup() {
    const newsId = parseInt(useRoute().value.params.id)

    const { isLoadingNews } = newsHandler()
    const { contact, loadContact } = contactHandler()

    onMounted(() => {
      loadContact()
    })

    return {
      newsId,
      isLoadingNews,
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

.news-id-detail {
  &__header {
    @include index-section-title;
  }
}

.news-id-aside {
  margin-top: 8rem;
  &__header {
    text-align: center;
    font-weight: bold;
  }
}
</style>
