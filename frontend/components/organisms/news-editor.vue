<template>
  <b-modal
    v-model="activator"
    title="News 登録内容の編集"
  >
    <p class="my-3">News Form</p>
    <p class="my-3">{{ newsId }}</p>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

const activator = ref(false);
const newsId = ref(0)

export const activateToEdit = (id: number) => {
  activator.value = true
  newsId.value = id
}

export default defineComponent({
  name: 'NewsEditor',
  setup() {
    return {
      activator,
      newsId
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
