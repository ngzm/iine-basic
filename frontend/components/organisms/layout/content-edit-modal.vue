<template>
  <b-modal
    v-model="activator.show"
    title="コンテンツの編集"
  >
    <p class="my-3">{{ activator.type }}</p>
    <p class="my-3">{{ activator.id }}</p>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export const editTypes = {
  eyecatch: 'eyecatch',
  information: 'inforamtion',
  news: 'news',
  service: 'service',
  work: 'work',
  contact: 'contact',
  menu: 'menu',
  none: 'none'
} as const

type EditType = typeof editTypes[keyof typeof editTypes];

const activator = reactive({
  show: false,
  type: editTypes.none,
  id: 0
})

export const activateToEdit = (type: EditType, id: number = 0) => {
  Object.assign(activator, {
    show: true,
    type,
    id
  })
}

export default defineComponent({
  name: 'ContentEditModal',
  setup() {
    return {
      activator,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
