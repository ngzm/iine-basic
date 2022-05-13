<template>
  <nav class="nav-bar">
    <div class="nav-bar__title">
      <slot name="title" />
    </div>
    <div class="g-block-lg">
      <slot name="wide" />
    </div>
    <div class="g-block-sm">
      <slot name="narrow" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'NavBar',
})
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}
</style>
