<template>
  <div class="nav-link-wrapper">
    <template v-if="href && href.length > 0">
      <a :href="href"><slot /></a>
    </template>
    <template v-else-if="to && to.name && to.name.length > 0">
      <nuxt-link v-if="scrollTo && scrollTo.el && scrollTo.el.length > 0" v-scroll-to="scrollTo" :to="to">
        <slot />
      </nuxt-link>
      <nuxt-link v-else :to="to">
        <slot />
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

interface NavLinkTo {
  name: string;
  hash?: string
}

interface NavLinkScrollTo {
  el: string;
  offset?: number
}

export default defineComponent({
  name: 'NavLink',
  props: {
    href: {
      type: String,
      default: ''
    } ,
    to: {
      type: Object as PropType<NavLinkTo>,
      default: () => ({ name: '' })
    },
    scrollTo: {
      type: Object as PropType<NavLinkScrollTo>,
      default: () => ({ el: '' })
    },
  },
})
</script>

<style lang="scss" scoped>
.nav-link-wrapper {
  display: inline;
  margin: 0;
  padding: 0;
}
</style>
