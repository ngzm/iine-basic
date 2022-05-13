<template>
  <div id="application-base-body">
    <header>
      <default-header />
      <bread-crumb-nav />
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <bread-crumb-nav />
      <default-footer />
    </footer>
    <inquire-form-sidebar />
    <make-toast />
    <content-edit-modal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultHeader from '@/components/organisms/layout/default-header.vue'
import DefaultFooter from '@/components/organisms/layout/default-footer.vue'
import BreadCrumbNav from '@/components/molecules/bread-crumb-nav.vue'
import ContentEditModal from '@/components/molecules/edit/content-edit-modal.vue'
import MakeToast from '@/components/molecules/make-toast.vue'
import InquireFormSidebar from '@/components/organisms/layout/inquire-form-sidebar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultFooter,
    BreadCrumbNav,
    InquireFormSidebar,
    MakeToast,
    ContentEditModal,
  },
})
</script>

<style lang="scss" scoped>
#application-base-body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  header {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10;
  }
  main {
    flex-grow: 1;
    position: relative;
    margin: 0;
    padding: 0;
  }
  footer {
    padding: 0;
    margin: 0;
  }
}
</style>
