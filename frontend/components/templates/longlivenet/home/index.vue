<template>
  <article>
    <div  id="index-top-position">
      <eye-catcher :eye-catch="eyeCatch" />
      <nav-bread-brumb />
    </div>


    <article id="index-information-article">
      <informations
        :informations="informations"
        class="article-margin"
      />
    </article>

    <article id="index-news-article">
      <newses
        :newses="newses"
        class="article-margin"
      />
    </article>

    <article id="index-services-article">
      <services
        :services="services"
        class="article-margin"
      />
    </article>

    <article id="index-contact-article">
      <contact
        class="article-margin"
        :contact="contact"
      />
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import EyeCatcher from './eye-catcher.vue'
import Informations from './informations.vue'
import Newses from './newses.vue'
import Services from './services.vue'
import Contact from './contact.vue'
import NavBreadBrumb from '@/components/organisms/layout/nav-bread-crumb.vue'
import homeIndexDataHandler from '@/composable/home-index-data-handler'

export default defineComponent({
  name: 'LongLivenetHomeIndex',
  components: {
    EyeCatcher,
    Informations,
    Newses,
    Services,
    Contact,
    NavBreadBrumb,
  },
  setup() {
    const {
      eyeCatch,
      loadEyeCatch,
      informations,
      loadInformations,
      newses,
      loadNewses,
      services,
      loadServices,
      contact,
      loadContact,
    } = homeIndexDataHandler()

    onMounted(() => {
      loadEyeCatch()
      loadInformations()
      loadNewses()
      loadServices()
      loadContact()
    })

    return {
      eyeCatch,
      informations,
      newses,
      services,
      contact,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.article-margin {
  @include index-article-margin;
}
</style>