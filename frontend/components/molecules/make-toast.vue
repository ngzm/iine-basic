<template>
  <span :style="{ display: 'none' }" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useMakeToast from '@/composable/use-make-toast'

const MakeToast = defineComponent({
  name: 'MakeToast',
  setup() {
    const { addTrriger, toastParams, setAddTrriger } = useMakeToast()

    return {
      addTrriger,
      toastParams,
      setAddTrriger,
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
        appendToast: false,
      })

      this.setAddTrriger(false)
    },
  },
})

export default MakeToast
</script>
