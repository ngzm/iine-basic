<template>
  <div
    class="section-content-eyecatcher"
    :class="{ circle: circle, round: round }"
    :style="`background-image: url(${image}); height: ${height}`"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SectionContentEyecaher',
  props: {
    image: {
      type: String,
      required: true,
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
  background-position: center center;
  background-size: cover;
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
