<template>
  <div class="contents-card-body">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsCardBody',
})
</script>

<style lang="scss" scoped>
.contents-card-body {
  max-width: 56rem;
  margin: 0 auto;
  padding: 2.5rem;
}
</style>
