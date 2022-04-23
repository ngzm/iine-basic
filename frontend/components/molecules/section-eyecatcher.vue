<template>
  <div class="section-eyecatcher" :style="{ 'background-image': `url(${backgroundImage})` }">
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
      required: true
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$eyecatcher-height: 380px;
$eyecatcher-height-sm: 240px;

.section-eyecatcher {
  height: $eyecatcher-height;
  display: flex;
  justify-content: center;
  align-content:center;
  align-items:center;
  background-position: center;
  background-size: cover;
  &__titles {
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 1rem;
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .section-eyecatcher {
    height: $eyecatcher-height-sm;
  }
}
</style>
