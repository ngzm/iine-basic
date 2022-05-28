<template>
  <div class="header-wide-menu">
    <nav-link
      :scroll-to="toTop.scrollTo"
      :to="toTop.to"
      class="navigation-link"
    >
      <b-icon icon="house-fill" font-scale="1.5" />
    </nav-link>
    <nav-link
      :scroll-to="toInformation.scrollTo"
      :to="toInformation.to"
      class="navigation-link"
    >
      Message
    </nav-link>
    <nav-link
      :scroll-to="toNews.scrollTo"
      :to="toNews.to"
      class="navigation-link"
    >
      News
    </nav-link>
    <nav-link
      :scroll-to="toServices.scrollTo"
      :to="toServices.to"
      class="navigation-link"
    >
      Services
    </nav-link>
    <nav-link
      :scroll-to="toContact.scrollTo"
      :to="toContact.to"
      class="navigation-link"
    >
      Contact
    </nav-link>
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
.header-wide-menu {
  .navigation-link {
    font-weight: bold;
    margin-right: 0.5rem;
    ::v-deep a {
      color: white;
    }
    ::v-deep a:hover {
      color: orange;
    }
  }
}
</style>
