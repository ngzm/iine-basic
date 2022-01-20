<template>
  <div class="contents-card">
    <slot />
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
  min-width: 300px;
  margin: 0 auto;
  background-color: white;
}

@media only screen and (min-width: $grid-breakpoint-md) {
  .contents-card {
    width: 80%;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>

