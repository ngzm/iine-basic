<template>
  <nav-bar class="default-header">
    <template #title>
      <h2 class="default-header__title">
        <nav-link :scroll-to="toTop.scrollTo" :to="toTop.to" class="default-header__title-link" >
          ロングリブネット
        </nav-link>
      </h2>
    </template>
    <template #wide>
      <div>
        <nav-link :scroll-to="toInformation.scrollTo" :to="toInformation.to" class="default-header__nav-link mr-2">
          Message
        </nav-link>
        <nav-link :scroll-to="toNews.scrollTo" :to="toNews.to" class="default-header__nav-link mr-2">
          News
        </nav-link>
        <nav-link :scroll-to="toServices.scrollTo" :to="toServices.to" class="default-header__nav-link mr-2">
          Services
        </nav-link>
        <nav-link :scroll-to="toContact.scrollTo" :to="toContact.to" class="default-header__nav-link mr-2">
          Contact
        </nav-link>
      </div>
    </template>
    <template #narrow>
      <div>
        <b-button v-b-toggle.default-header-sidebar variant="light">
          <b-icon icon="list" variant="primary" style="width: 1.5rem; height: 1.5rem;" />
        </b-button>
      </div>
      <b-sidebar
        id="default-header-sidebar"
        title="ロングリブネット"
        bg-variant="dark"
        text-variant="light"
        shadow
        backdrop
      >
        <p>
        <nav-link :scroll-to="toInformation.scrollTo" :to="toInformation.to" class="default-header__nav-link mr-2">
          Message
        </nav-link>
        </p>
        <nav-link :scroll-to="toNews.scrollTo" :to="toNews.to" class="default-header__nav-link mr-2">
          News
        </nav-link>
        <nav-link :scroll-to="toServices.scrollTo" :to="toServices.to" class="default-header__nav-link mr-2">
          Services
        </nav-link>
        <nav-link :scroll-to="toContact.scrollTo" :to="toContact.to" class="default-header__nav-link mr-2">
          Contact
        </nav-link>
      </b-sidebar>
    </template>
  </nav-bar>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'
import NavBar from '@/components/atoms/nav-bar.vue'
import NavLink from '@/components/atoms/nav-link.vue'

export default defineComponent({
  name: 'DefaultHeader',
  components: {
    NavBar,
    NavLink
  },
  setup() {
    const route = useRoute()
    const isIndex = computed(() => route.value.name === 'index')

    const indexLinkTo = (hash: string) => isIndex.value ? {
      scrollTo: { el: hash, offset: -180 }, to: { name: 'index' }
    } : {
      scrollTo: {}, to: { name: 'index', hash }
    }

    const toTop = computed(() => indexLinkTo('#index-top-position'))
    const toInformation = computed(() => indexLinkTo('#index-information-article'))
    const toNews = computed(() => indexLinkTo('#index-news-article'))
    const toServices = computed(() => indexLinkTo('#index-services-article'))
    const toContact = computed(() => indexLinkTo('#index-contact-article'))

    return {
      toTop,
      toInformation,
      toNews,
      toServices,
      toContact
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.default-header {
  background-color: rgba(64,64,64,0.5);
  padding: 40px 1.5rem;
  &__title {
    margin: 0;
    &-link {
      font-weight: bold;
      font-size: 1.2rem;
      ::v-deep a {
        color: yellow;
      }
      ::v-deep a:hover {
        color: hotpink;
      }
    }
  }
  &__nav-link {
    font-weight: bold;
    ::v-deep a {
      color: white;
    }
    ::v-deep a:hover {
      color: orange;
    }
  }
}
</style>
