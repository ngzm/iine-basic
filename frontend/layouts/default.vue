<template>
  <div id="application-base-body">
    <header>
      <default-header />
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <default-footer />
    </footer>
    <contact-sidebar />
    <make-toast />
    <content-edit-modal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultHeader from '@/components/organisms/layout/default-header.vue'
import DefaultFooter from '@/components/organisms/layout/default-footer.vue'
import ContactSidebar from '@/components/organisms/layout/contact-form-sidebar.vue'
import MakeToast from '@/components/molecules/make-toast.vue'
import ContentEditModal from '@/components/organisms/layout/content-edit-modal.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultFooter,
    ContactSidebar,
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
