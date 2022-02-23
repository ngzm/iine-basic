<template>
  <span :style="{ display: 'none'}" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@nuxtjs/composition-api'

interface ToastParams {
  title: string
  message: string
  variant: string
}

const toastParams: ToastParams = reactive({
  title: 'Toast',
  message: 'Completed !',
  variant: 'default'
})

const addToast = (params: ToastParams) => {
  Object.assign(toastParams, params)
  setAddTrriger(true)
}

const addTrriger = ref(false)
const setAddTrriger = (v: boolean) => { addTrriger.value = v }

const MakeToast = defineComponent({
  name: 'MakeToast',
  setup() {
    return {
      addTrriger,
      toastParams,
      setAddTrriger
    }
  },
  watch: {
    addTrriger(val: boolean) {
      if (!val) return

      this.$bvToast.toast(this.toastParams.message, {
        title: this.toastParams.title,
        variant: this.toastParams.variant,
        toaster: 'b-toaster-bottom-right',
        solid: true,
        appendToast: false
      })

      this.setAddTrriger(false)
    }
  }
})

export default MakeToast
export { ToastParams, addToast }
</script>
