<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import longlivenetNewsId from '~/components/templates/longlivenet/news/id.vue'
import { useCurrentCustomer } from '@/composable/use-current-customer'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    longlivenetNewsId,
  },
  setup() {
    const { customer } = useCurrentCustomer()
    const templateName = `${customer?.template}NewsId`
    return { templateName }
  },
})
</script>
