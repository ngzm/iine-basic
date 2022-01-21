<template>
  <h4 class="section-title">
    <span><slot /></span>
  </h4>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SectionTitle'
})
</script>

<style lang="scss" scoped>
.section-title {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  text-align: center;
  span {
    background: linear-gradient(transparent 75%, orange 75%);
    font-weight: bold;
  }
}
</style>
