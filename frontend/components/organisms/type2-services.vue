<template>
  <contents-grid :contents-list="serviceList" class="type2-services">
    <template #default="{ content }">
      <h5 class="type2-services__content-title">
        {{ content.title }}
      </h5>
      <section-content-eyecatcher
        :image="content.image"
        height="14rem"
        circle
        class="type2-services__content-eyecatcher"
      />
      <p class="type2-services__content-body">
        {{ content.body || '' }}
      </p>
    </template>

    <template #editActivator="{ content }">
      <content-edit-activator
        :type="editType"
        :content-id="content.id"
        size="1.6rem"
      />
    </template>
  </contents-grid>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { contentDataTypes } from '@/composable/use-content-helper'
import { useServiceList } from '@/composable/use-service-data'
import ContentsGrid from '~/components/molecules/contents-grid.vue'
import SectionContentEyecatcher from '@/components/molecules/section-content-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Services',
  components: {
    ContentsGrid,
    SectionContentEyecatcher,
    ContentEditActivator
  },
  setup() {
    const { serviceList, loading, loadServiceList } = useServiceList()

    onMounted(() => {
      loadServiceList()
    })

    return {
      serviceList,
      loading,
      editType: contentDataTypes.service
    }
  }
})
</script>

<style lang="scss" scoped>
.type2-services {
  &__content-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
  }
  &__content-eyecatcher {
    margin-top: 0.5rem;
    margin-bottom: 0.8rem;
  }
  &__content-body {
    text-align: left;
    margin: 0;
    padding: 0;
  }
}
</style>
