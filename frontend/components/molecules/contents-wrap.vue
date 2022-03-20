<template>
  <div class="contents-wrap">
    <b-overlay :show="loading">
      <div class="contents-wrap__innner">
        <slot />
      </div>
      <div v-if="$slots.editActivator" class="contents-wrap__edit-activator">
        <slot name="editActivator" />
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsWrap',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
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
    right: 2rem;
  }
}

@media only screen and (min-width: $grid-breakpoint-md) {
  .contents-wrap {
    width: 98%;
  }
}
</style>
