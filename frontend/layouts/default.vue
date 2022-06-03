<template>
  <div id="application-base-body">
    <header>
      <default-header />
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
    <on-preview />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import DefaultHeader from '@/components/organisms/layout/default-header.vue'
import DefaultFooter from '@/components/organisms/layout/default-footer.vue'
import BreadCrumbNav from '@/components/molecules/bread-crumb-nav.vue'
import MakeToast from '@/components/molecules/make-toast.vue'
import InquireFormSidebar from '@/components/organisms/inquire/inquire-form-sidebar.vue'
import ContentEditModal from '@/components/molecules/edit/content-edit-modal.vue'
import OnPreview from '@/components/molecules/edit/on-preview.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultFooter,
    BreadCrumbNav,
    InquireFormSidebar,
    MakeToast,
    ContentEditModal,
    OnPreview,
  },
  setup() {
    const { theme, headInfo } = useCurrentCustomer()

    if (process.client) {
      console.log('theme===', theme)
      document.body.className = `${theme}-theme`
      console.log('className===', `${theme}-theme`)
    }

    return {
      title: headInfo.title,
      content: headInfo.content,
      favicon: headInfo.favicon,
    }
  },
  head() {
    return {
      title: `${this.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.content}`,
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/${this.favicon}`,
        },
      ],
    }
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
