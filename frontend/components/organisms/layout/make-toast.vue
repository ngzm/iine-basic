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

const addTrriger = ref(false)

const toastHandler = () => {
  const addToast = (params: ToastParams) => {
    Object.assign(toastParams, params)
    setAddTrriger(true)
  }

  const setAddTrriger = (v: boolean) => { addTrriger.value = v }

  return {
    toastParams,
    addToast,
    addTrriger,
    setAddTrriger,
  }
}

const toastComponent = defineComponent({
  name: 'MakeToast',
  setup() {
    const { addTrriger, toastParams, setAddTrriger } = toastHandler()
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

export default toastComponent;
export { ToastParams, toastHandler }
</script>
