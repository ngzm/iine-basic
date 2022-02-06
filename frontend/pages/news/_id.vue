<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LongLivenetNewsDetail from '~/components/templates/longlivenet/news-detail.vue'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    LongLivenetNewsDetail,
  },
  setup() {
    const templateName = 'LongLivenetNewsDetail'
    return {
      templateName
    }
  }
})
</script>
