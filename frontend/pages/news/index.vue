<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LongLivenetNewsIndex from '~/components/templates/longlivenet/news/index.vue'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    LongLivenetNewsIndex,
  },
  setup() {
    const templateName = 'LongLivenetNewsIndex'
    return { templateName }
  },
})
</script>
