<template>
  <b-modal
    v-model="activator"
    title="Information 登録内容の編集"
  >
    <p class="my-3">Information Form</p>
    <p class="my-3">{{ informationId }}</p>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

const activator = ref(false);
const informationId = ref(0)

export const activateToEdit = (id: number) => {
  activator.value = true
  informationId.value = id
}

export default defineComponent({
  name: 'InformationEditor',
  setup() {
    return {
      activator,
      informationId
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
