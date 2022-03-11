<template>
  <b-sidebar
    :id="sidebarIdName"
    title="お問い合せ"
    right
    shadow
    backdrop
  >
    <div class="px-3 py-2">
      <div
        :style="{ 'background-image': `url(${contact.image})` }"
        class="contact-form-sidebar__eyecatch"
      />
      <div class="contact-form-sidebar__address">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="contactBody" />
      </div>
      <div class="contact-form-sidebar__form">
        <contact-form v-if="isFormMode" @submit="sendContactMail" />
        <contact-form-result v-else @ok="setFormMode" />
      </div>
    </div>
  </b-sidebar>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import { ContactFormType } from '@/types/contact-form'
import { ToastParams, addToast } from '@/components/molecules/make-toast.vue'
import { useContactData } from '~/composable/use-contact-data'
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
    const { contact, loadContact } = useContactData()

    onMounted(() => {
      loadContact(1)
    })

    // TODO: need sanitize!
    const contactBody = computed(() => contact.value.body || '')

    const sendContactMail = (data: ContactFormType) => {
      console.log(data)

      setResultMode()
      addToast({
        title: '送信完了',
        message: 'お問合せメールを送信しました',
        variant: 'success'
      } as ToastParams)
    }

    const { isFormMode, setFormMode, setResultMode } = formMode()

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

const formMode = () => {
  enum MODE { form, result }
  const mode = ref(MODE.form)
  return {
    isFormMode: computed(() => mode.value === MODE.form),
    setFormMode: () => { mode.value = MODE.form },
    setResultMode: () => {  mode.value = MODE.result }
  }
}
</script>

<style lang="scss" scoped>
.contact-form-sidebar {
  &__eyecatch {
    width: 100%;
    height: 10rem;
    background-position: center center;
    background-size: cover;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto 1rem auto;
  }
  &__address {
    padding: 1rem 0;
    margin-bottom: 1rem;
  }
  &__form {
    border-top: 2px solid lightgray;
    padding: 1rem 0;
  }
}
</style>
