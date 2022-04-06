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
        class="inquire-form-sidebar__eyecatch"
      />
      <div class="inquire-form-sidebar__address">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="contactBody" />
      </div>
      <div class="inquire-form-sidebar__form">
        <inquire-form v-if="isFormMode" @submit="sendInquirMail" />
        <inquire-form-result v-else @ok="setFormMode" />
      </div>
    </div>
  </b-sidebar>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import useMakeToast, { ToastParams } from '@/composable/use-make-toast'
import { useContactData } from '@/composable/use-contact-data'
import InquireForm, { InquireFormType } from '@/components/organisms/inquire/inquire-form.vue'
import InquireFormResult from '@/components/organisms/inquire/inquire-form-result.vue'

export const sidebarIdName = 'inquire-form-sidebar'

export default defineComponent({
  name: 'ContactFormSidebar',
  components: {
    InquireForm,
    InquireFormResult,
  },
  props: {
    contentId: {
      type: Number,
      default: 1
    },
  },
  setup(props) {
    const { contact, loadContact } = useContactData()

    onMounted(async () => {
      await loadContact(props.contentId)
    })

    // TODO: need sanitize!
    const contactBody = computed(() => contact.body || '')

    const { addToast } = useMakeToast()
    const sendInquirMail = (data: InquireFormType) => {
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
      sendInquirMail,
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
.inquire-form-sidebar {
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
