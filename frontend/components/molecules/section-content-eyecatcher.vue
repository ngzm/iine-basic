<template>
  <div
    class="section-content-eyecatcher"
    :class="{ circle: circle, round: round }"
    :style="{
      '--background-image': `url(${image.url || ''})`,
      '--background-size': 'cover',
      '--background-position': 'center',
    }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ImageSetting } from '@/types/content-types'

export default defineComponent({
  name: 'SectionContentEyecaher',
  props: {
    image: {
      type: Object as PropType<ImageSetting>,
      default: {} as ImageSetting,
    },
    height: {
      type: String,
      default: '16rem',
    },
    circle: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.section-content-eyecatcher {
  height: 16rem;
  background-image: var(--background-image);
  background-size: var(--background-size);
  background-position: var(--background-position);
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
}
.circle {
  border-radius: 50%;
  overflow: hidden;
}
.round {
  border-radius: 12px;
  overflow: hidden;
}
</style>
