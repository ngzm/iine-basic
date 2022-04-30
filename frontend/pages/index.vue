<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import longlivenetIndex from '~/components/templates/longlivenet/index.vue'
import { useCurrentCustomer } from '@/composable/use-current-customer'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    longlivenetIndex,
  },
  setup() {
    const { customer } = useCurrentCustomer()
    const templateName = `${customer?.template}Index`
    return { templateName }
  },
})
</script>
