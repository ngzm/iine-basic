<template>
  <div class="default-footer">
    <p class="default-footer__copyright">Copyright © 2022 ロングリブネット</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'DefautFooter',
})
</script>

<style lang="scss" scoped>
.default-footer {
  background-color: white;
  color: dimgray;
  padding: 1rem;
  &__copyright {
    text-align: center;
  }
}
</style>
