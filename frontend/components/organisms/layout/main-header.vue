<template>
<div>
  <b-navbar toggleable="md" class="main-header-nav">
    <b-navbar-brand href="/">ロングリブネット</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          active
          link-classes="nav-item"
        >
          Message
        </b-nav-item>
        <b-nav-item
          href="#"
          link-classes="nav-item"
          active-class="active"
        >
          News
        </b-nav-item>
        <b-nav-item
          href="#"
          link-classes="nav-item"
          active-class="nav-active"
        >
          Services
        </b-nav-item>
        <b-nav-item
          href="#"
          link-classes="nav-item"
          active-class="nav-active"
        >
          Contact
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MainHeeder',
})
</script>

<style lang="scss" scoped>
.main-header-nav {
  background-color: rgba(64,64,64,0.5);
  padding-top: 40px;
  padding-bottom: 40px;
  .nav-item {
    color: white;
  }
  .active {
    color: yellow !important;
    font-weight: bold;
  }
}
</style>
