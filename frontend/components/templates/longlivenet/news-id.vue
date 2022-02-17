<template>
  <article id="news-id-article-top">
    <div>
      <nav-bread-brumb />
    </div>
    <section class="news-id-detail">
      <h4 class="news-id-detail__header"><span>News</span></h4>
      <news-detail :news-id="newsId">
        <template #nav>
          <div class="news-id-detail__action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              <b-icon icon="hand-index" />
              お問い合せ
            </b-button>
          </div>
        </template>
      </news-detail>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import NewsDetail from '@/components/organisms/type1-news-detail.vue'
import newsHandler from '@/composable/news-handler'
// import contactHandler from '@/composable/contact-handler'
import { sidebarIdName } from '~/components/organisms/layout/contact-form-sidebar.vue'

export default defineComponent({
  name: 'LongLivenetNewsId',
  components: {
    NavBreadBrumb,
    NewsDetail,
  },
  setup() {
    const newsId = parseInt(useRoute().value.params.id)
    const { isLoadingNews } = newsHandler()

    return {
      sidebarIdName,
      newsId,
      isLoadingNews,
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
  &__action {
    text-align: center;
  }
}
</style>
