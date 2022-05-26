<template>
  <div>
    <component :is="templateName" />
    <TopToButton :src="topButtonImage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import TopToButton from '@/components/molecules/top-to-button.vue'

import longlivenetIndex from '@/components/templates/longlivenet/index.vue'

export default defineComponent({
  name: 'HomeIndex',
  components: {
    TopToButton,
    longlivenetIndex,
  },
  setup() {
    const { template } = useCurrentCustomer()
    const topButtonImage = '/image/arrow-up4.png'

    return {
      templateName: `${template}Index`,
      topButtonImage,
    }
  },
})
</script>
