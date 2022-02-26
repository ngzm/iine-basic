<template>
  <div class="content-edit-activator">
    <b-avatar
      icon="pencil-square"
      button
      :size="size"
      :variant="variant"
      @click="activateToEdit(type, contentId)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { editTypes, activateToEdit } from '@/components/organisms/layout/content-edit-modal.vue'

export type EditType = typeof editTypes[keyof typeof editTypes];

export default defineComponent({
  name: 'ContentEditActivator',
  props: {
    type: {
      type: String as PropType<EditType>,
      required: true
    },
    contentId: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '2.5em'
    },
    variant: {
      type: String,
      default: 'success'
    }
  },
  setup() {
    return {
      activateToEdit,
    }
  },
})
</script>

<style lang="scss" scoped>
.content-edit-activator {
  display: inline-block;
}
</style>
