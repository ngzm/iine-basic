<template>
  <div class="contents-card">
    <div v-if="$slots.header" class="contents-card__header">
      <slot name="header" />
    </div>
    <div class="contents-card__text">
      <slot />
    </div>
    <div v-if="$slots.footer" class="contents-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ContentsCard',
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents-card {
  width: 100%;
  min-width: 18rem;
  margin: 0 auto;
  background-color: white;
  &__header {
    margin: 0 auto;
  }
  &__text {
    max-width: 54rem;
    margin: 0 auto;
    padding: 2.5rem;
  }
  &__footer {
    margin: 0 auto;
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

