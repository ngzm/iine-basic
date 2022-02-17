<template>
  <b-sidebar
    :id="sidebarIdName"
    title="お問い合せ"
    right
    shadow
    backdrop
  >
    <div class="px-3 py-3">
      <div
        :style="{ 'background-image': `url(${contact.image})` }"
        class="contact-sidebar__eyecatch"
      />
      <div class="contact-sidebar__address">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="contactBody" />
      </div>
      <div class="contact-sidebar__form">
        <contact-form v-if="isFormMode" @submit="sendContactMail" />
        <contact-form-result v-else @ok="setFormMode" />
      </div>
    </div>
  </b-sidebar>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import { ContactType } from '@/types/content-type'
import contactHandler from '@/composable/contact-handler'
import ContactForm from '@/components/molecules/contact-form.vue'
import ContactFormResult from '@/components/molecules/contact-form-result.vue'

export const sidebarIdName = 'contact-form-sidebar'

export default defineComponent({
  name: 'ContactSidebar',
  components: {
    ContactForm,
    ContactFormResult,
  },
  setup() {
    const { contact, loadContact } = contactHandler()

    onMounted(() => {
      loadContact()
    })

    // TODO: need sanitize!
    const contactBody: ContactType = computed(() => contact.body)

    const sendContactMail = (data) => {
      console.log(data)

      setResultMode()
    }

    enum MODE { form, result }
    const mode = ref(MODE.form)
    const isFormMode = computed(() => mode.value === MODE.form)
    const setFormMode = () => { mode.value = MODE.form }
    const setResultMode = () => {  mode.value = MODE.result }
      
    return {
      sidebarIdName,
      contact,
      contactBody,
      sendContactMail,
      isFormMode,
      setFormMode,
      setResultMode 
    }
  },
})
</script>

<style lang="scss" scoped>
.contact-sidebar {
  &__eyecatch {
    width: 100%;
    height: 10rem;
    background-position: center center;
    background-size: cover;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto 2rem auto;
  }
  &__address {
    padding: 1rem 0;
    margin-bottom: 2rem;
  }
  &__form {
    border-top: 2px solid lightgray;
    padding: 1rem 0;
  }
}
</style>
