<template>
  <div class="bread-crumb-nav">
      <b-breadcrumb :items="items" class="bread-crumb-nav__items" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'
import { UiComponentOptions } from '@/types/ui-types'

export default defineComponent({
  name: 'BreadCrumbNav',
  setup() {
    const route = useRoute()
    const detailId = computed(() => route.value.params && route.value.params.id ? route.value.params.id : '')

    interface Route2ItemsDefinder { [key: string]: UiComponentOptions[]; }
    const route2items: Route2ItemsDefinder = {
      'index': [{ text: 'HOME', active: true }],
      'news': [{ text: 'HOME', to: { name: 'index' } }, { text: 'NEWS', active: true }],
      'news-id': [{ text: 'HOME', to: { name: 'index' } }, { text: 'NEWS', to: { name: 'news' } }, { text: `${detailId.value}`, active: true }],
    }

    const items = computed(() => route2items[route.value.name || 'index'])
    return {
      items,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.bread-crumb-nav {
  &__items {
    background-color: transparent;
  }
}
</style>
