<template>
  <article>
    <div id="index-top-position">
      <top-eye-catcher />
    </div>

    <article id="index-information-article">
      <section class="article-margin top-margin">
        <h4 class="section-title"><span>Message</span></h4>
        <informations>
          <template #action>
            <b-button
              v-scroll-to="{ el:'#index-contact-article', offset: -180 }"
              :to="{ name: 'index' }"
              variant="primary"
            >
              <b-icon icon="hand-index" />
              お問合せ
            </b-button>
          </template>
        </informations>
      </section>
    </article>

    <article id="index-news-article">
      <section class="article-margin">
        <h4 class="section-title"><span>What's New</span></h4>
        <newses>
          <template #action>
            <b-link to="/news">and more ...</b-link>
          </template>
        </newses>
      </section>
    </article>

    <article id="index-services-article">
      <section class="article-margin">
        <h4 class="section-title"><span>Services</span></h4>
        <services />
      </section>
    </article>

    <article id="index-contact-article">
      <section class="article-margin">
        <h4 class="section-title"><span>Contact</span></h4>
        <contact />
      </section>
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute, useRouter, nextTick } from '@nuxtjs/composition-api'
import VueScrollTo from "vue-scrollto"

import TopEyeCatcher from '~/components/organisms/type1-top-eye-catcher.vue'
import Informations from '@/components/organisms/type1-informations.vue'
import Newses from '@/components/organisms/type1-newses.vue'
import Services from '~/components/organisms/type2-services.vue'
import Contact from '@/components/organisms/type1-contact.vue'

export default defineComponent({
  name: 'LongLivenetIndex',
  components: {
    TopEyeCatcher,
    Informations,
    Newses,
    Services,
    Contact,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      if (route.value.hash) {
        const hash = route.value.hash
        router.replace({ name: 'index', hash: ''})
        nextTick(() => {
          VueScrollTo.scrollTo(hash, 500, { offset: -180 })
        })
      }
    })
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