<template>
  <div>
    <top-eye-catcher />
    <nav-bread-brumb />
    <top-information />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopEyeCatcher from '@/components/organisms/index/top-eye-catcher.vue'
import NavBreadBrumb from '@/components/organisms/common/nav-bread-crumb.vue'
import TopInformation from '@/components/organisms/index/top-information.vue'

export default defineComponent({
  name: 'MyIndex',
  components: {
    TopEyeCatcher,
    NavBreadBrumb,
    TopInformation,
  },
})
</script>
