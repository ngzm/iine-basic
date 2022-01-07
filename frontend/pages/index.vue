<template>
  <my-nav />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MyNav from '@/components/my-nav.vue'

export default defineComponent({
  name: 'MyIndex',
  components: { MyNav },
})
</script>
