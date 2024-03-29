<template>
  <b-sidebar :id="sidebarIdName" title="お問い合せ" right shadow backdrop>
    <div class="px-3 py-2">
      <div class="inquire-form-sidebar__address">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="contactBody" />
      </div>
      <div class="inquire-form-sidebar__form">
        <inquire-form v-if="isFormMode" @submitted="onSubmitted" />
        <inquire-form-result v-else @ok="setFormMode" />
      </div>
    </div>
  </b-sidebar>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import { sanitizer } from '@/utils/common-utils'
import useMakeToast, { ToastParams } from '@/composable/use-make-toast'
import { useContactData } from '@/composable/use-contact-data'
import InquireForm from '@/components/organisms/inquire/inquire-form.vue'
import InquireFormResult from '@/components/organisms/inquire/inquire-form-result.vue'

export const sidebarIdName = 'inquire-form-sidebar'

export default defineComponent({
  name: 'InquireFormSidebar',
  components: {
    InquireForm,
    InquireFormResult,
  },
  props: {
    contentId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const { contact, loadContact, getRecentData } = useContactData()
    const contactBody = computed(() => sanitizer(contact.body))
    const { isFormMode, setFormMode, setResultMode } = formMode()

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
        await loadContact(currentId)
      }
    })

    const { addToast } = useMakeToast()
    const onSubmitted = () => {
      setResultMode()
      addToast({
        title: '送信完了',
        message: 'お問合せメールを送信しました',
        variant: 'success',
      } as ToastParams)
    }

    return {
      sidebarIdName,
      contact,
      contactBody,
      onSubmitted,
      isFormMode,
      setFormMode,
      setResultMode,
    }
  },
})

const formMode = () => {
  enum MODE {
    form,
    result,
  }
  const mode = ref(MODE.form)
  return {
    isFormMode: computed(() => mode.value === MODE.form),
    setFormMode: () => {
      mode.value = MODE.form
    },
    setResultMode: () => {
      mode.value = MODE.result
    },
  }
}
</script>

<style lang="scss" scoped>
.inquire-form-sidebar {
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
