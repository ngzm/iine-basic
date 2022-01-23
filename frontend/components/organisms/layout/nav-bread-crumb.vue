<template>
  <div id="nav-bread-crumb-wrap">
      <b-breadcrumb :items="items" class="nav-bread-crumb" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { UiComponentOptions } from '@/types/ui-types'

export default defineComponent({
  name: 'NavBreadBrumb',
  setup(_props, context) {
    interface Route2ItemsDefinder {
        [key: string]: UiComponentOptions[];
    }
    const route2items: Route2ItemsDefinder = {
      index: [{ text: 'HOME', active: true }],
      news: [{ text: 'HOME', to: { name: 'index' } }, { text: 'NEWS', active: true }],
    }
    const route = context.root.$route;
    const items = computed(() => route2items[route.name || 'index'])
    return {
      items,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.nav-bread-crumb {
  background-color: $base-background-color;
}
</style>
