<template>
  <div class="footer-menu">
    <p class="footer-menu__copyright">Copyright © 2022 ロングリブネット</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LongLivenetFooter',
})
</script>

<style lang="scss" scoped>
.footer-menu {
  padding: 1rem;
  &__copyright {
    text-align: center;
  }
}
</style>
