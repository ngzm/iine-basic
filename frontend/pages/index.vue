<template>
  <div>
    <home-eye-catcher />
    <nav-bread-brumb />
    <home-information class="section-margin"/>
    <home-news class="section-margin"/>
    <home-services class="section-margin"/>
    <home-contact class="section-margin"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HomeEyeCatcher from '~/components/organisms/home/home-eye-catcher.vue'
import NavBreadBrumb from '~/components/organisms/layout/nav-bread-crumb.vue'
import HomeInformation from '~/components/organisms/home/home-information.vue'
import HomeNews from '~/components/organisms/home/home-news.vue'
import HomeServices from '~/components/organisms/home/home-services.vue'
import HomeContact from '~/components/organisms/home/home-contact.vue'

export default defineComponent({
  name: 'MyIndex',
  components: {
    HomeEyeCatcher,
    NavBreadBrumb,
    HomeInformation,
    HomeNews,
    HomeServices,
    HomeContact
  },
})
</script>

<style lang="scss" scoped>
.section-margin {
  margin-top: 6em;
  margin-bottom: 6em;
}
</style>
