<template>
  <div
    class="top-eye-catcher"
    :style="{
      '--background-image': `url(${image.url || ''})`,
      '--background-size-lg': image.lgSize || 'cover',
      '--background-size-sm': image.smSize || 'cover',
      '--background-position-lg': image.lgPosition || 'center',
      '--background-position-sm': image.smPosition || 'center',
      '--background-parallax-lg': image.lgParallax ? 'fixed' : 'scroll',
      '--background-parallax-sm': image.smParallax ? 'fixed' : 'scroll',
    }"
  >
    <div class="top-eye-catcher__titles">
      <slot />
    </div>
    <div v-if="$slots.actions" class="top-eye-catcher__actions">
      <slot name="actions" />
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
  background-repeat: no-repeat;
  background-image: var(--background-image);
  background-size: var(--background-size-lg);
  background-position: var(--background-position-lg);
  background-attachment: var(--background-parallax-lg);
  &__titles {
    position: absolute;
    display: inline-block;
    bottom: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__actions {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background-color: rgba(255, 255, 255, 0.5);
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .top-eye-catcher {
    height: 100vh;
    background-size: var(--background-size-sm);
    background-position: var(--background-position-sm);
    background-attachment: var(--background-parallax-sm);
    &__actions {
      bottom: 1rem;
      right: 1rem;
    }
  }
}
</style>
