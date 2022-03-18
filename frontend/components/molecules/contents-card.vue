<template>
  <div class="contents-card">
    <b-overlay :show="loading">
      <div class="contents-card__innner">
        <slot />
      </div>
      <div v-if="$slots.editActivator" class="contents-card__edit-activator">
        <slot name="editActivator" />
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsCard',
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

<style lang="scss">
.contents-card {
  &__inner-body {
    max-width: 54rem;
    margin: 0 auto;
    padding: 2.5rem;
  }
}
</style>

