<template>
  <h2 class="header-title">
    <nav-link
      :scroll-to="toTop.scrollTo"
      :to="toTop.to"
      class="header-title__link"
    >
      ロングリブネット
    </nav-link>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePageLayout } from '@/composable/use-page-layout'
import NavLink from '@/components/atoms/nav-link.vue'

export default defineComponent({
  name: 'LongLivenetHeaderTitle',
  components: { NavLink },
  setup() {
    const { toTop } = usePageLayout()
    return { toTop }
  },
})
</script>

<style lang="scss" scoped>
.header-title {
  margin: 0;
  &__link {
    font-weight: bold;
    font-size: 1.2rem;
    ::v-deep a {
      color: yellow;
    }
    ::v-deep a:hover {
      color: hotpink;
    }
  }
}
</style>
