<template>
  <b-badge :variant="categoryVariant" class="news-badge">
    <span>{{ categoryLabel }}</span>
  </b-badge>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'NewsCategoryBadge',
  props: {
    category: {
      type: String,
      required: true
    }
  },
  setup(props) {
    interface Category2LabelType {
      [key: string]: { label: string; variant: string; }
    }
    const category2Label: Category2LabelType = {
      I: { label: 'INFO', variant: 'info' },
      S: { label: 'SERVICE', variant: 'success' },
      W: { label: 'WORK', variant: 'warning' },
      T: { label: 'TECH', variant: 'danger' },
    }
    const categoryLabel = computed(() => category2Label[props.category] ? category2Label[props.category].label : 'OTHER')
    const categoryVariant = computed(() => category2Label[props.category] ? category2Label[props.category].variant : 'dark')
    return { categoryLabel, categoryVariant }
  },
})
</script>

<style lang="scss" scoped>
.news-badge {
  width: 6rem;
}
</style>
