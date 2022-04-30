<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import longlivenetNewsIndex from '~/components/templates/longlivenet/news/index.vue'
import { useCurrentCustomer } from '@/composable/use-current-customer'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    longlivenetNewsIndex,
  },
  setup() {
    const { customer } = useCurrentCustomer()
    const templateName = `${customer?.template}NewsIndex`
    return { templateName }
  },
})
</script>
