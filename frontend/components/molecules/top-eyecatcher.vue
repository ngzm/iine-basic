<template>
  <div
    class="top-eye-catcher"
    :style="{
      '--background-image': `url(${image.url || ''})`,
      '--background-size-lg': image.lgSize || 'cover',
      '--background-size-sm': image.smSize || 'cover',
      '--background-position-lg': image.lgPosition || 'center',
      '--background-position-sm': image.smPosition || 'center',
    }"
  >
    <div class="top-eye-catcher__titles">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ImageSetting } from '@/types/content-types'

export default defineComponent({
  name: 'TopEyecatcher',
  props: {
    image: {
      type: Object as PropType<ImageSetting>,
      default: {} as ImageSetting,
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.top-eye-catcher {
  height: 100vh;
  min-height: 400px;
  position: relative;
  background-image: var(--background-image);
  background-size: var(--background-size-lg);
  background-position: var(--background-position-lg);
  background-repeat: no-repeat;
  &__titles {
    position: absolute;
    display: inline-block;
    bottom: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .top-eye-catcher {
    height: 90vh;
    background-size: var(--background-size-sm);
    background-position: var(--background-position-sm);
  }
}
</style>
