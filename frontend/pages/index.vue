<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LongLivenetIndex from '~/components/templates/longlivenet/index.vue'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    LongLivenetIndex,
  },
  setup() {
    const templateName = 'LongLivenetIndex'
    return { templateName }
  },
})
</script>
