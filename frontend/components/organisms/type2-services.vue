<template>
  <contents-grid :contents-list="services">
    <template #editActivator="{ content }">
      <content-edit-activator
        type="service"
        :content-id="content.id"
        size="1.6rem"
      />
    </template>
  </contents-grid>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import ContentsGrid from '@/components/molecules/contents-grid.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'
import serviceHandler from '@/composable/service-handler'

export default defineComponent({
  name: 'Type1Services',
  components: {
    ContentsGrid,
    ContentEditActivator
  },
  setup() {
    const { services, loadServices } = serviceHandler()

    onMounted(() => {
      loadServices()
    })

    return {
      services,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
