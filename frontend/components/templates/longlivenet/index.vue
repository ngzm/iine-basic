<template>
  <article>
    <div id="index-top-position">
      <top-eye-catcher :content-id="1" />
    </div>

    <article id="index-information-article">
      <section class="article-margin top-margin">
        <h4 class="section-title"><span>Message</span></h4>
        <information-detail :content-id="1">
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
        </information-detail>
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
import { defineComponent, onMounted, ref, computed, watch, useRoute, useRouter, useStore, nextTick } from '@nuxtjs/composition-api'
import VueScrollTo from "vue-scrollto"
import TopEyeCatcher from '@/components/organisms/home/type1-top-eyecatcher-detail.vue'
import InformationDetail from '~/components/organisms/information/type1-information-detail.vue'
import Newses from '@/components/organisms/news/type1-newses.vue'
import Services from '@/components/organisms/service/type2-services.vue'
import Contact from '@/components/organisms/contact/type1-contact.vue'

export default defineComponent({
  name: 'LongLivenetIndex',
  components: {
    TopEyeCatcher,
    InformationDetail,
    Newses,
    Services,
    Contact,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { getters } = useStore()

    const isBuzy = computed<boolean>(() => getters['buzy/isBuzy'])
    const hash = ref('')

    onMounted(() => {
      if (route.value.hash) {
        hash.value = route.value.hash
        router.replace({ name: 'index', hash: ''})
      }
    })

    const stop = watch(isBuzy, (newValue) => {
      if (newValue) return
      if (hash.value.length > 0) {
        nextTick(() => {
          VueScrollTo.scrollTo(hash.value, 500, { offset: -180 })
        })
      }
      stop()
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