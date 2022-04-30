<template>
  <div
    class="section-eyecatcher background-image-props"
    :style="{
      '--background-image': `url(${backgroundImage})`,
      '--background-size': `${size}%`,
    }"
  >
    <div v-if="$slots.default" class="section-eyecatcher__titles">
      <slot />
    </div>
    <b-form-input v-model="size" type="range" min="100" max="250" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SectionEyecatcher',
  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
  },
  setup() {
    const size = ref(100)
    return {
      size,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$eyecatcher-height: 450px;
$eyecatcher-height-sm: 680px;

.background-image-props {
  --background-position: 10% 60%;
  // --background-size: 250%;
}

.section-eyecatcher {
  height: 35vh;
  max-height: $eyecatcher-height;
  min-height: calc($eyecatcher-height * 0.5);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-image: var(--background-image);
  background-repeat: no-repeat;
  background-position: var(--background-position);
  background-size: var(--background-size);
  // background-size: cover;
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
    background-position: 10% center;
    background-size: cover;
  }
}
</style>
