<template>
  <div class="top-eyecatch-to-edit">
    <b-avatar
      button
      icon="pencil-square"
      :size="size"
      :variant="variant"
      @click="activateToEdit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { activateToEdit } from '~/components/organisms/top-eyecatch-editor.vue'

export default defineComponent({
  name: 'TopEyecatchToEdit',
  props: {
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
.top-eyecatch-to-edit {
  display: inline-block;
}
</style>
