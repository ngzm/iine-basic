<template>
  <div class="contents-wrap" :class="{ 'contents-gap': !noGap }">
    <b-overlay :show="overlay">
      <div class="contents-wrap__innner">
        <slot />
      </div>

      <div
        v-if="$slots.editActivator"
        class="contents-wrap__edit-activator"
        :style="{ top: activatorPositionTop, right: activatorPositionRight }"
      >
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
  name: 'ContentsWrap',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    noGap: {
      type: Boolean,
      default: false,
    },
    activatorPositionTop: {
      type: [Number, String],
      default: 0,
    },
    activatorPositionRight: {
      type: [Number, String],
      default: '1rem',
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents-wrap {
  position: relative;
  width: 100%;
  min-width: 18rem;
  margin: 0 auto;
  &__inner {
    margin: 0;
    padding: 0;
  }
  &__edit-activator {
    position: absolute;
    top: 0;
    right: 1rem;
  }
}

.contents-gap {
  width: 94%;
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .contents-gap {
    width: 100%;
  }
}
</style>
