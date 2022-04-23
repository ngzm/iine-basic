<template>
  <div
    class="contents-card-side"
    :class="{ 'flex-direction-right': direction === 'right' }"
  >
    <div
      :style="{ 'background-image': `url(${headerImage})` }"
      class="contents-card-side__header"
    >
      <slot name="header" />
    </div>
    <div class="contents-card-side__content">
      <div class="contents-card-side__text">
        <slot />
      </div>
      <div v-if="$slots.footer" class="contents-card-side__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsCardSide',
  props: {
    headerImage: {
      type: String,
      default: '' 
    },
    direction: {
      type: String,
      default: 'left'
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents-card-side {
  display: flex;
  justify-content: stretch;
  width: 100%;
  min-width: 18rem;
  margin: 0 auto;
  background-color: white;
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    background-position: center center;
    background-size: cover;
  }
  &__content {
    width: 60%;
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

.flex-direction-right {
  flex-direction: row-reverse;
}

@media only screen and (min-width: $grid-breakpoint-md) {
  .contents-card-side {
    width: 90%;
    border-radius: 12px;
    overflow: hidden;
  }
}
</style>

