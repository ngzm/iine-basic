<template>
  <div v-if="isOnPreview" class="on-preview">
    <b-button variant="warning" @click="togglePreview()">
      <b-icon icon="eye-fill" />
      プレビュー中
    </b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePreviewControll } from '@/composable/use-edit-controll'

export default defineComponent({
  name: 'OnPreview',
  setup() {
    const { isOnPreview, togglePreview } = usePreviewControll()
    return {
      isOnPreview,
      togglePreview,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.on-preview {
  position: fixed;
  top: calc(#{$nav-header-height} + 0.5rem);
  right: 2rem;
}
</style>
