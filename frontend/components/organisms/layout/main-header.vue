<template>
  <b-navbar toggleable="md" class="main-header-nav">
    <b-navbar-brand to="/">
      <span class="nav-brand">ロングリブネット</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/#index-information-article">
          <span class="nav-item">Message</span>
        </b-nav-item>
        <b-nav-item to="/#index-news-article">
          <span class="nav-item">News</span>
        </b-nav-item>
        <b-nav-item to="/#index-services-article">
          <span class="nav-item">Services</span>
        </b-nav-item>
        <b-nav-item to="/#index-contact-article">
          <span class="nav-item">Contact</span>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MainHeeder',
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
  }
  .nav-brand:active,:focus {
    color: hotpink;
  }
  .nav-item {
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
