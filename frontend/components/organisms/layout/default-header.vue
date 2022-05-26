<template>
  <nav-bar class="default-header">
    <template #title>
      <h2 class="default-header__title">
        <nav-link
          :scroll-to="toTop.scrollTo"
          :to="toTop.to"
          class="default-header__title-link"
        >
          ロングリブネット
        </nav-link>
      </h2>
    </template>
    <template #wide>
      <div>
        <nav-link
          :scroll-to="toTop.scrollTo"
          :to="toTop.to"
          class="default-header__nav-link mr-2"
        >
          <b-icon icon="house-fill" font-scale="1.5" />
        </nav-link>
        <nav-link
          :scroll-to="toInformation.scrollTo"
          :to="toInformation.to"
          class="default-header__nav-link mr-2"
        >
          Message
        </nav-link>
        <nav-link
          :scroll-to="toNews.scrollTo"
          :to="toNews.to"
          class="default-header__nav-link mr-2"
        >
          News
        </nav-link>
        <nav-link
          :scroll-to="toServices.scrollTo"
          :to="toServices.to"
          class="default-header__nav-link mr-2"
        >
          Services
        </nav-link>
        <nav-link
          :scroll-to="toContact.scrollTo"
          :to="toContact.to"
          class="default-header__nav-link mr-2"
        >
          Contact
        </nav-link>
        <customer-user-tools v-show="isAuthenticated" class="ml-2" />
      </div>
    </template>
    <template #narrow>
      <div>
        <customer-user-tools v-show="isAuthenticated" :with-name="false" />
        <b-button variant="light" @click="openSidebar">
          <b-icon
            icon="list"
            variant="dark"
            style="width: 1.5rem; height: 18px"
          />
        </b-button>
      </div>
      <b-sidebar
        v-model="sidebar"
        bg-variant="dark"
        text-variant="light"
        shadow
        backdrop
      >
        <div class="default-header__sidebar">
          <h4 class="default-header__sidebar--title">
            <nav-link
              :scroll-to="toTop.scrollTo"
              :to="toTop.to"
              class="default-header__title-link"
              @click.native="closeSidebar"
            >
              ロングリブネット
            </nav-link>
          </h4>
          <div class="default-header__sidebar--item">
            <nav-link
              :scroll-to="toTop.scrollTo"
              :to="toTop.to"
              class="default-header__nav-link mr-2"
              @click.native="closeSidebar"
            >
              <b-icon icon="house-fill" font-scale="1.5" />
              Home
            </nav-link>
          </div>
          <div class="default-header__sidebar--item">
            <nav-link
              :scroll-to="toInformation.scrollTo"
              :to="toInformation.to"
              class="default-header__nav-link mr-2"
              @click.native="closeSidebar"
            >
              Message
            </nav-link>
          </div>
          <div class="default-header__sidebar--item">
            <nav-link
              :scroll-to="toNews.scrollTo"
              :to="toNews.to"
              class="default-header__nav-link mr-2"
              @click.native="closeSidebar"
            >
              News
            </nav-link>
          </div>
          <div class="default-header__sidebar--item">
            <nav-link
              :scroll-to="toServices.scrollTo"
              :to="toServices.to"
              class="default-header__nav-link mr-2"
              @click.native="closeSidebar"
            >
              Services
            </nav-link>
          </div>
          <div class="default-header__sidebar--item">
            <nav-link
              :scroll-to="toContact.scrollTo"
              :to="toContact.to"
              class="default-header__nav-link mr-2"
              @click.native="closeSidebar"
            >
              Contact
            </nav-link>
          </div>
        </div>
      </b-sidebar>
    </template>
  </nav-bar>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import { useAuthenticated } from '@/composable/use-authenticated'
import NavBar from '@/components/atoms/nav-bar.vue'
import NavLink from '@/components/atoms/nav-link.vue'
import CustomerUserTools from '@/components/organisms/layout/customer-user-tools.vue'

export default defineComponent({
  name: 'DefaultHeader',
  components: {
    NavBar,
    NavLink,
    CustomerUserTools,
  },
  setup() {
    const { isAuthenticated } = useAuthenticated()
    const route = useRoute()
    const isIndex = computed(() => route.value.name === 'index')
    const indexLinkTo = (hash: string) =>
      isIndex.value
        ? { scrollTo: { el: hash, offset: -180 }, to: { name: 'index' } }
        : { scrollTo: {}, to: { name: 'index', hash } }

    const toTop = computed(() => indexLinkTo('#index-top-position'))
    const toInformation = computed(() =>
      indexLinkTo('#index-information-article')
    )
    const toNews = computed(() => indexLinkTo('#index-news-article'))
    const toServices = computed(() => indexLinkTo('#index-services-article'))
    const toContact = computed(() => indexLinkTo('#index-contact-article'))

    const sidebar = ref(false)
    const openSidebar = () => {
      sidebar.value = true
    }
    const closeSidebar = () => {
      sidebar.value = false
    }

    return {
      isAuthenticated,
      toTop,
      toInformation,
      toNews,
      toServices,
      toContact,
      sidebar,
      openSidebar,
      closeSidebar,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.default-header {
  background-color: rgba(64, 64, 64, 0.5);
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
  &__sidebar {
    padding: 1rem 1.5rem 1rem 1.5rem;
    &--title {
      margin-bottom: 2rem;
    }
    &--item {
      margin-top: 1rem;
    }
  }
}
</style>
