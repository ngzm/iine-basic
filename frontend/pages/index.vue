<template>
  <div>
    <top-eye-catcher />
    <my-nav />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TopEyeCatcher from '@/components/organisms/index/top-eye-catcher.vue'
import MyNav from '@/components/my-nav.vue'

export default defineComponent({
  name: 'MyIndex',
  components: {
    MyNav,
    TopEyeCatcher
  },
})
</script>
