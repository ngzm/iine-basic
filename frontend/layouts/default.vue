<template>
  <div id="application-base-body">
    <header>
      <main-header />
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <p>Copyright © 2022 ロングリブネット</p>
    </footer>
    <contact-sidebar />
    <make-toast />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import MainHeader from '@/components/organisms/layout/main-header.vue'
import ContactSidebar from '@/components/organisms/layout/contact-form-sidebar.vue'
import MakeToast from '@/components/organisms/layout/make-toast.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    MainHeader,
    ContactSidebar,
    MakeToast
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
}
</style>
