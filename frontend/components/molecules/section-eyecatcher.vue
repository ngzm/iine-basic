<template>
  <div
    class="section-eyecatcher"
    :style="{
      '--background-image': `url(${image.url || ''})`,
      '--background-size-lg': `${size}%`,
      '--background-size-sm': image.smSize || 'cover',
      '--background-position-lg': image.lgPosition || 'center',
      '--background-position-sm': image.smPosition || 'center',
    }"
  >
    <div v-if="$slots.default" class="section-eyecatcher__titles">
      <slot />
    </div>
    <b-form-input v-model="size" type="range" min="100" max="250" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import { ImageSetting } from '@/types/content-types'

export default defineComponent({
  name: 'SectionEyecatcher',
  props: {
    image: {
      type: Object as PropType<ImageSetting>,
      default: {} as ImageSetting,
    },
  },
  setup() {
    const size = ref(100)
    return { size }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$eyecatcher-height: 450px;
$eyecatcher-height-sm: 680px;

.section-eyecatcher {
  height: 35vh;
  max-height: $eyecatcher-height;
  min-height: calc($eyecatcher-height * 0.5);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-image: var(--background-image);
  background-size: var(--background-size-lg);
  background-position: var(--background-position-lg);
  background-repeat: no-repeat;
  &__titles {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem;
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .section-eyecatcher {
    height: 75vh;
    max-height: $eyecatcher-height-sm;
    min-height: calc($eyecatcher-height-sm * 0.5);
    background-size: var(--background-size-sm);
    background-position: var(--background-position-sm);
  }
}
</style>
