<template>
  <contents-grid :contents-list="services" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import ContentsGrid from '@/components/molecules/contents-grid.vue'
import serviceHandler from '@/composable/service-handler'

export default defineComponent({
  name: 'Type1Services',
  components: { ContentsGrid },
  setup() {
    const { services, loadServices } = serviceHandler()

    onMounted(() => {
      loadServices()
    })

    return {
      services,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
