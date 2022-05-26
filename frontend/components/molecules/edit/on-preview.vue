<template>
  <div v-if="isOnPreview" class="on-preview">
    <b-button variant="warning" size="sm" @click="togglePreview()">
      プレビュー中
    </b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuthenticated } from '@/composable/use-authenticated'

export default defineComponent({
  name: 'OnPreview',
  setup() {
    const { isOnPreview, togglePreview } = useAuthenticated()
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
