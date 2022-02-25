<template>
  <b-modal
    v-model="activator"
    title="トップエリア登録内容の編集"
  >
    <p class="my-3">Top EyeCatch Form</p>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

const activator = ref(false);

export const activateToEdit = () => {
  activator.value = true
}

export default defineComponent({
  name: 'TopEyecatchEditor',
  setup() {
    return { activator }
  },
})
</script>

<style lang="scss" scoped>
</style>
