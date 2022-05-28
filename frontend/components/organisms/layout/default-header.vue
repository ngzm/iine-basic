<template>
  <nav-bar class="default-header">
    <template #title>
      <component :is="titleTemplateName" />
    </template>
    <template #wide>
      <div class="default-header__wide-menu">
        <component :is="wideMenuTemplateName" />
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
        <component :is="narrowMenuTemplateName" @close="closeSidebar" />
      </b-sidebar>
    </template>
  </nav-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useAuthenticated } from '@/composable/use-authenticated'
import NavBar from '@/components/atoms/nav-bar.vue'
import CustomerUserTools from '@/components/organisms/layout/customer-user-tools.vue'

import longlivenetHeaderTitle from '@/components/templates/longlivenet/layout/header/title.vue'
import longlivenetHeaderWideMenu from '@/components/templates/longlivenet/layout/header/wide-menu.vue'
import longlivenetHeaderNarrowMenu from '@/components/templates/longlivenet/layout/header/narrow-menu.vue'

export default defineComponent({
  name: 'DefaultHeader',
  components: {
    NavBar,
    CustomerUserTools,
    longlivenetHeaderTitle,
    longlivenetHeaderWideMenu,
    longlivenetHeaderNarrowMenu,
  },
  setup() {
    const { template } = useCurrentCustomer()
    const { isAuthenticated } = useAuthenticated()

    const sidebar = ref(false)
    const openSidebar = () => {
      sidebar.value = true
    }
    const closeSidebar = () => {
      sidebar.value = false
    }

    return {
      titleTemplateName: `${template}HeaderTitle`,
      wideMenuTemplateName: `${template}HeaderWideMenu`,
      narrowMenuTemplateName: `${template}HeaderNarrowMenu`,
      isAuthenticated,
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
  &__wide-menu {
    display: flex;
    align-items: center;
  }
}
</style>
