<template>
  <div class="contents-card">
    <b-overlay :show="overlay">
      <div class="contents-card__innner">
        <slot />
      </div>

      <div v-if="$slots.editActivator" class="contents-card__edit-activator">
        <slot name="editActivator" />
      </div>

      <template v-if="$slots.overlay" #overlay>
        <slot name="overlay" />
      </template>
    </b-overlay>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsCard',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents-card {
  position: relative;
  width: 100%;
  min-width: 18rem;
  margin: 0 auto;
  background-color: white;
  &__inner {
    margin: 0;
    padding: 0;
  }
  &__edit-activator {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}

@media only screen and (min-width: $grid-breakpoint-md) {
  .contents-card {
    width: 90%;
    border-radius: 12px;
    overflow: hidden;
  }
}
</style>
