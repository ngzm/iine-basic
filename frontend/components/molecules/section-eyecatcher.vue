<template>
  <div
    class="section-eyecatcher"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <div v-if="$slots.default" class="section-eyecatcher__titles">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SectionEyecatcher',
  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
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
  background-position: center;
  background-size: cover;
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
  }
}
</style>
