<template>
  <div
    v-if="$route.name !== 'index'"
    class="bread-crumb-nav"
  >
    <b-breadcrumb
      :items="items"
      class="bread-crumb-nav__items"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, useRoute } from '@nuxtjs/composition-api'
import { UiComponentOptions } from '@/types/ui-types'

export default defineComponent({
  name: 'BreadCrumbNav',
  setup() {
    const route = useRoute()
    const items = ref([] as UiComponentOptions[])

    onMounted(() => {
      const idPath = route.value.params && route.value.params.id ? route.value.params.id : 'ID'
      items.value = routeItems(route.value.name, idPath )
    })

    watch(route, (newValue) => {
      const idPath = newValue.params && newValue.params.id ? newValue.params.id : 'ID'
      items.value = routeItems(newValue.name, idPath )
    })

    const routeItems = (name: string | null | undefined, idPath: string) => {
      switch(name) {
        case 'index':
          return [{ text: 'HOME', active: true }]

        case 'news':
          return [
            { text: 'HOME', to: { name: 'index' } },
            { text: 'NEWS', active: true },
          ]

        case 'news-id':
          return [
            { text: 'HOME', to: { name: 'index' } },
            { text: 'NEWS', to: { name: 'news' } },
            { text: `${idPath}`, active: true },
          ]
      }
      return []
    }

    return { items }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.bread-crumb-nav {
  &__items {
    background-color: transparent;
    margin-bottom: 0 !important;
  }
}
</style>
