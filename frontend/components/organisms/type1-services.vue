<template>
  <contents-grid :contents-list="services" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ServiceType } from '~/types/content-type'
import ContentsGrid from '@/components/molecules/contents-grid.vue'

export default defineComponent({
  name: 'Type1Services',
  components: { ContentsGrid },
  props: {
    services: {
      type: Array as PropType<ServiceType[]>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
