<template>
  <div
    class="section-eyecatcher"
    :style="{
      '--background-image': `url(${image.url || ''})`,
      '--background-size-lg': image.lgSize || 'cover',
      '--background-size-sm': image.smSize || 'cover',
      '--background-position-lg': image.lgPosition || 'center',
      '--background-position-sm': image.smPosition || 'center',
      '--background-parallax-lg':
        image.lgParallax && !isIOS ? 'fixed' : 'scroll',
      '--background-parallax-sm':
        image.smParallax && !isIOS ? 'fixed' : 'scroll',
    }"
  >
    <div v-if="$slots.default" class="section-eyecatcher__titles">
      <slot />
    </div>

    <div v-if="$slots.actions" class="section-eyecatcher__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ImageSetting } from '@/types/content-types'
import { useDetectIOS } from '@/composable/use-window'

export default defineComponent({
  name: 'SectionEyecatcher',
  props: {
    image: {
      type: Object as PropType<ImageSetting>,
      default: {} as ImageSetting,
    },
  },
  setup() {
    const { isIOS } = useDetectIOS()
    return { isIOS }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$eyecatcher-height: 500px;
$eyecatcher-height-sm: 600px;

.section-eyecatcher {
  height: 30vh;
  max-height: $eyecatcher-height;
  min-height: calc($eyecatcher-height * 0.5);
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-image: var(--background-image);
  background-size: var(--background-size-lg);
  background-position: var(--background-position-lg);
  background-attachment: var(--background-parallax-lg);
  &__titles {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem;
  }
  &__actions {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background-color: rgba(255, 255, 255, 0.5);
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .section-eyecatcher {
    height: 50vh;
    max-height: $eyecatcher-height-sm;
    min-height: calc($eyecatcher-height-sm * 0.5);
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
