<template>
  <div class="overlay-wrapper">
    <slot />
    <div class="not-buzy" :class="{ 'now-buzy': overlay }">
      <b-spinner type="grow" variant="primary" label="processing ..." />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'OverlayWrapper',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay-wrapper {
  position: relative;
  .not-buzy {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .now-buzy {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
}
</style>
