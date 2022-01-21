<template>
  <div class="contents-card">
    <div v-if="!noHeader" class="contents-card__header">
      <slot name="header" />
    </div>
    <div class="contents-card__text">
      <slot />
    </div>
    <div v-if="!noFooter" class="contents-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ContentsCard',
  props: {
    noHeader: {
      type: Boolean,
      default: false 
    },
    noFooter: {
      type: Boolean,
      default: false
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.contents-card {
  width: 100%;
  min-width: 300px;
  margin: 0 auto;
  background-color: white;
  &__header {
    margin: 0 auto;
  }
  &__text {
    max-width: 780px;
    margin: 0 auto;
    padding: 2.5em;
  }
  &__footer {
    margin: 0 auto;
  }
}

@media only screen and (min-width: $grid-breakpoint-md) {
  .contents-card {
    width: 80%;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>

