<template>
  <component :is="templateName" />
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import LongLivenetNewsIndex from '~/components/templates/longlivenet/news-index.vue'

export default defineComponent({
  name: 'NewsIndex',
  components: {
    LongLivenetNewsIndex,
  },
  setup() {
    const { route } = useContext()

    const templateName = 'LongLivenetNewsIndex'

    onMounted(() => {
      const id = route.value.params.id
      console.log('params', route.value.params)
      console.log('id', id)
    })
    return {
      templateName
    }
  }
})
</script>
