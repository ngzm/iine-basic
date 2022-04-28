<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LongLivenetNewsId from '~/components/templates/longlivenet/news/id.vue'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    LongLivenetNewsId,
  },
  setup() {
    const templateName = 'LongLivenetNewsId'
    return { templateName }
  },
})
</script>
