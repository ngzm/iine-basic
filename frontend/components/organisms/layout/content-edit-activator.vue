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
import { defineComponent, PropType, reactive } from '@vue/composition-api'
import { ContentDataType, contentDataTypes } from '@/composable/content-helper'

const activator = reactive({
  show: false,
  type: contentDataTypes.none as ContentDataType,
  id: 0
})

export const getActivator = () => activator

export default defineComponent({
  name: 'ContentEditActivator',
  props: {
    type: {
      type: String as PropType<ContentDataType>,
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
    const activateToEdit = (type: ContentDataType, id: number = 0) => {
      Object.assign(activator, { show: true, type, id })
    }

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
