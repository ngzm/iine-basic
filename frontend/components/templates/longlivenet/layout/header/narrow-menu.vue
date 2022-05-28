<template>
  <div class="header-narrow-menu">
    <h4 class="header-narrow-menu__title">
      <nav-link
        :scroll-to="toTop.scrollTo"
        :to="toTop.to"
        class="navigation-link"
        @click.native="$emit('close')"
      >
        ロングリブネット
      </nav-link>
    </h4>
    <div class="header-narrow-menu__item">
      <nav-link
        :scroll-to="toTop.scrollTo"
        :to="toTop.to"
        class="navigation-link"
        @click.native="$emit('close')"
      >
        <b-icon icon="house" font-scale="1.1" class="mr-2" />
        Home
      </nav-link>
    </div>
    <div class="header-narrow-menu__item">
      <nav-link
        :scroll-to="toInformation.scrollTo"
        :to="toInformation.to"
        class="navigation-link"
        @click.native="$emit('close')"
      >
        <b-icon icon="hand-index" font-scale="1.1" class="mr-2" />
        Message
      </nav-link>
    </div>
    <div class="header-narrow-menu__item">
      <nav-link
        :scroll-to="toNews.scrollTo"
        :to="toNews.to"
        class="navigation-link"
        @click.native="$emit('close')"
      >
        <b-icon icon="newspaper" font-scale="1.1" class="mr-2" />
        News
      </nav-link>
    </div>
    <div class="header-narrow-menu__item">
      <nav-link
        :scroll-to="toServices.scrollTo"
        :to="toServices.to"
        class="navigation-link"
        @click.native="$emit('close')"
      >
        <b-icon icon="x-diamond" font-scale="1.1" class="mr-2" />
        Services
      </nav-link>
    </div>
    <div class="header-narrow-menu__item">
      <nav-link
        :scroll-to="toContact.scrollTo"
        :to="toContact.to"
        class="navigation-link"
        @click.native="$emit('close')"
      >
        <b-icon icon="chat-quote" font-scale="1.1" class="mr-2" />
        Contact
      </nav-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePageLayout } from '@/composable/use-page-layout'
import NavLink from '@/components/atoms/nav-link.vue'

export default defineComponent({
  name: 'LongLivenetHeaderWideMenu',
  components: { NavLink },
  setup() {
    const { toTop, toInformation, toNews, toServices, toContact } =
      usePageLayout()

    return {
      toTop,
      toInformation,
      toNews,
      toServices,
      toContact,
    }
  },
})
</script>

<style lang="scss" scoped>
.header-narrow-menu {
  padding: 1rem 1.5rem;
  &__title {
    margin-bottom: 2rem;
    .navigation-link {
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
  &__item {
    margin-bottom: 1rem;
    .navigation-link {
      ::v-deep a {
        color: white;
      }
      ::v-deep a:hover {
        color: orange;
      }
    }
  }
}
</style>
