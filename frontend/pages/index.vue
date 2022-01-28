<template>
  <article>
    <div  id="index-top-position">
      <home-eye-catcher />
      <nav-bread-brumb />
    </div>

    <article id="index-information-article">
      <home-information class="article-margin" />
    </article>

    <article id="index-news-article">
      <home-news class="article-margin" />
    </article>

    <article id="index-services-article">
      <home-services class="article-margin" />
    </article>

    <article id="index-contact-article">
      <home-contact class="article-margin" />
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HomeEyeCatcher from '~/components/organisms/home/home-eye-catcher.vue'
import NavBreadBrumb from '~/components/organisms/layout/nav-bread-crumb.vue'
import HomeInformation from '~/components/organisms/home/home-information.vue'
import HomeNews from '~/components/organisms/home/home-news.vue'
import HomeServices from '~/components/organisms/home/home-services.vue'
import HomeContact from '~/components/organisms/home/home-contact.vue'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    HomeEyeCatcher,
    NavBreadBrumb,
    HomeInformation,
    HomeNews,
    HomeServices,
    HomeContact
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.article-margin {
  @include index-article-margin;
}
</style>
