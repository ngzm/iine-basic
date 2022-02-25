<template>
  <div class="information-edit-activator">
    <b-avatar
      icon="pencil-square"
      button
      :size="size"
      :variant="variant"
      @click="activateToEdit(id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { activateToEdit } from '~/components/organisms/information-editor.vue'

export default defineComponent({
  name: 'InformationToEdit',
  props: {
    id: {
      type: Number,
      required: true
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
.information-edit-activator {
  display: inline-block;
}
</style>
