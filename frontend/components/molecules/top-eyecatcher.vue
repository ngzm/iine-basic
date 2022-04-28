<template>
  <div
    class="top-eye-catcher"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <div class="top-eye-catcher__titles">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TopEyecatcher',
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

.top-eye-catcher {
  height: 100vh;
  min-height: 400px;
  position: relative;
  background-position: center center;
  background-size: cover;
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
    height: 50vh;
  }
}
</style>
