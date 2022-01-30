<template>
  <section>
    <h4 class="section-title">
      <span>{{ title }}</span>
    </h4>
    <contents-grid :contents-list="services" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { ServiceType } from '~/types/content-type'
import ContentsGrid from '@/components/molecules/contents-grid.vue'

export default defineComponent({
  name: 'HomeServices',
  components: { ContentsGrid },
  props: {
    services: {
      type: Array as PropType<ServiceType[]>,
      required: true
    }
  },
  setup() {
    const title = computed(() => 'Services')
    return {
      title
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.section-title {
  @include index-section-title;
}
</style>
