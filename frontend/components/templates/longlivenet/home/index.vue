<template>
  <article>
    <div  id="index-top-position">
      <top-eye-catcher :eye-catch="eyeCatch" />
    </div>

    <article id="index-information-article">
      <section class="article-margin top-margin">
        <h4 class="section-title">
          <span>Message</span>
        </h4>
        <informations :informations="informations" />
      </section>
    </article>

    <article id="index-news-article">
      <section class="article-margin">
        <h4 class="section-title">
          <span>What's New</span>
        </h4>
        <newses :newses="newses" />
      </section>
    </article>

    <article id="index-services-article">
      <section class="article-margin">
        <h4 class="section-title">
          <span>Services</span>
        </h4>
        <services :services="services" />
      </section>
    </article>

    <article id="index-contact-article">
      <section class="article-margin">
        <h4 class="section-title">
          <span>Contact</span>
        </h4>
        <contact :contact="contact" />
      </section>
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'

import TopEyeCatcher from '@/components/organisms/top-eye-catcher.vue'
import Informations from '@/components/organisms/type1-informations.vue'
import Newses from '@/components/organisms/type1-newses.vue'
import Services from '@/components/organisms/type1-services.vue'
import Contact from '@/components/organisms/type1-contact.vue'

import eyeCatchHandler from '@/composable/eye-catch-handler'
import informationHandler from '@/composable/information-handler'
import newsHandler from '@/composable/news-handler'
import serviceHandler from '@/composable/service-handler'
import contactHandler from '@/composable/contact-handler'

export default defineComponent({
  name: 'LongLivenetHomeIndex',
  components: {
    TopEyeCatcher,
    Informations,
    Newses,
    Services,
    Contact,
  },
  setup() {
    const { eyeCatch, loadEyeCatch } = eyeCatchHandler()
    const { informations, loadInformations } = informationHandler()
    const { newses, loadNewses } = newsHandler()
    const { services, loadServices } = serviceHandler()
    const { contact, loadContact } = contactHandler()

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

.section-title {
  @include index-section-title;
}

.article-margin {
  @include index-article-margin;
}

.top-margin {
  margin-top: 7rem;
}
</style>