<template>
  <div>
    <header>
      <main-header />
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import MainHeader from '@/components/organisms/layout/main-header.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { MainHeader },
})
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 10;
}
main {
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
