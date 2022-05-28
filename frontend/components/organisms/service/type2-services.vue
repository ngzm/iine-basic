<template>
  <contents-wrap :overlay="loading || notFound">
    <contents-grid
      :contents-list="serviceList"
      @change="(list) => changeServicesPosition(list)"
    >
      <template #default="{ content }">
        <h5 class="type2-services__content-title">
          {{ content.title }}
        </h5>
        <section-content-eyecatcher
          :image="content.image"
          circle
          class="type2-services__content-eyecatcher"
        />
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="type2-services__content-body"
          v-html="serviceBodyHtml(content.body)"
        />
        <!-- eslint-enable -->
      </template>
      <template #editActivator="{ content }">
        <content-edit-activator
          :edit-props="{
            type: types.service,
            action: actions.moddel,
            id: content.id,
          }"
          size="1.6rem"
        />
      </template>
    </contents-grid>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator
        :edit-props="{
          type: types.service,
          action: actions.create,
        }"
      />
    </template>

    <template v-if="notFound" #overlay>
      <content-notfound :type="types.service" />
    </template>
  </contents-wrap>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { sanitizer } from '@/utils/common-utils'
import { editTypes, editActions } from '@/composable/use-edit-controll'
import { useServiceList } from '@/composable/use-service-data'
import ContentsWrap from '@/components/molecules/contents-wrap.vue'
import SectionContentEyecatcher from '@/components/molecules/section-content-eyecatcher.vue'
import ContentsGrid from '@/components/molecules/contents-grid.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'
import ContentNotfound from '~/components/molecules/edit/content-notfound.vue'

export default defineComponent({
  name: 'Type1Services',
  components: {
    ContentsWrap,
    ContentsGrid,
    SectionContentEyecatcher,
    ContentEditActivator,
    ContentNotfound,
  },
  setup() {
    const {
      serviceList,
      loading,
      notFound,
      loadServiceList,
      changeServicesPosition,
    } = useServiceList()

    onMounted(async () => {
      await loadServiceList()
    })

    const serviceBodyHtml = (body: string) => sanitizer(body)

    return {
      serviceList,
      serviceBodyHtml,
      loading,
      notFound,
      changeServicesPosition,
      types: editTypes,
      actions: editActions,
    }
  },
})
</script>

<style lang="scss" scoped>
.type2-services {
  &__content-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  &__content-body {
    text-align: left;
    margin-top: 1rem;
  }
}
</style>
