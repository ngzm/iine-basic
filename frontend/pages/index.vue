<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LongLivenetHomeIndex from '@/components/templates/longlivenet/home/index.vue'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    LongLivenetHomeIndex,
  },
  setup() {
    const templateName = 'LongLivenetHomeIndex'
    return {
      templateName
    }
  }
})
</script>
