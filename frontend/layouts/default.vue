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

    <top-eyecatch-editor />
    <news-editor />
    <information-editor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultHeader from '@/components/organisms/layout/default-header.vue'
import DefaultFooter from '@/components/organisms/layout/default-footer.vue'
import ContactSidebar from '@/components/organisms/layout/contact-form-sidebar.vue'
import MakeToast from '@/components/molecules/make-toast.vue'
import TopEyecatchEditor from '~/components/organisms/top-eyecatch-editor.vue'
import NewsEditor from '~/components/organisms/news-editor.vue'
import InformationEditor from '~/components/organisms/information-editor.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultFooter,
    ContactSidebar,
    MakeToast,
    TopEyecatchEditor,
    NewsEditor,
    InformationEditor,
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
