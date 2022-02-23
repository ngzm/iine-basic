<template>
  <nav class="nav-bar">
    <div class="nav-bar__title">
      <slot name="title" />
    </div>
    <div class="nav-bar__wide">
      <slot name="wide" />
    </div>
    <div class="nav-bar__narrow">
      <slot name="narrow" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'NavBar',
  setup() {
    
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  &__narrow {
    display: none;
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .nav-bar {
    &__wide {
      display: none;
    }
    &__narrow {
      display: inline;
    }
  }
}
</style>
