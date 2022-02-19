<template>
  <b-navbar type="dark" toggleable="md" class="main-header-nav">
    <b-navbar-brand v-scroll-to="'#index-top-position'" :to="{ name: 'index' }">
      <span class="nav-brand">ロングリブネット       {{ isIndex }}</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>

      <template v-if="isIndex">
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-scroll-to="{ el:'#index-information-article', offset: -180 }" :to="{ name: 'index' }">
          <span class="nav-item">Message</span>
        </b-nav-item>
        <b-nav-item v-scroll-to="{ el:'#index-news-article', offset: -180 }" :to="{ name: 'index' }">
          <span class="nav-item">News</span>
        </b-nav-item>
        <b-nav-item v-scroll-to="{ el:'#index-services-article', offset: -180 }" :to="{ name: 'index' }">
          <span class="nav-item">Services</span>
        </b-nav-item>
        <b-nav-item v-scroll-to="{ el:'#index-contact-article', offset: -180 }" :to="{ name: 'index' }">
          <span class="nav-item">Contact</span>
        </b-nav-item>
      </b-navbar-nav>

      <nuxt-link v-scroll-to="{ el:'#index-contact-article', offset: -180 }" :to="{ name: 'index' }">test1</nuxt-link>

      </template>

      <template v-else>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'index', hash: '#index-information-article' }">
          <span class="nav-item">Message</span>
        </b-nav-item>
        <b-nav-item :to="{ name: 'index', hash: '#index-news-article' }">
          <span class="nav-item">News</span>
        </b-nav-item>
        <b-nav-item :to="{ name: 'index', hash: '#index-services-article' }">
          <span class="nav-item">Services</span>
        </b-nav-item>
        <b-nav-item v-scroll-to={} to="/#index-contact-article">
          <span class="nav-item">Contact</span>
        </b-nav-item>
      </b-navbar-nav>

      <nuxt-link :to="{ name: 'index', hash: '#index-contact-article' }">test2</nuxt-link>

      </template>

    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MainHeeder',
  setup() {
    const route = useRoute()
    const isIndex = computed(() => route.value.name === 'index')
    return { isIndex }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.main-header-nav {
  background-color: rgba(64,64,64,0.5);
  // min-height: $nav-header-height;
  padding-top: 40px;
  padding-bottom: 40px;
  .nav-brand {
    color: yellow;
    font-weight: bold;
    font-size: 1.1rem;
  }
  .nav-brand:active,:focus {
    color: hotpink;
  }
  .nav-item {
    font-size: 1.1rem;
    color: white;
  }
  .nav-item:link,:visited {
    color: white;
  }
  .nav-item:hover {
    color: orange;
  }
  .nav-item:active,:focus {
    color: hotpink;
  }
}
</style>
