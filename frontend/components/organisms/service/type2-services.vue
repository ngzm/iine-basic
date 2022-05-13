<template>
  <contents-wrap :overlay="loading || notFound">
    <contents-grid
      :contents-list="serviceList"
      :is-authenticated="isAuthenticated"
      @change="(list) => changeServicesPosition(list)"
    >
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
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="type2-services__content-body"
          v-html="serviceBodyHtml(content.body)"
        />
        <!-- eslint-enable -->
      </template>
      <template #editActivator="{ content }">
        <content-edit-activator
          :type="types.service"
          :action="actions.moddel"
          :content-id="content.id"
          size="1.6rem"
        />
      </template>
    </contents-grid>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator :type="types.service" :action="actions.create" />
    </template>

    <template v-if="notFound" #overlay>
      <div class="text-center">
        <h4 class="my-3">Services コンテンツが登録されていません</h4>
        <p class="my-3">コンテンツを作成してください</p>
        <content-edit-activator
          :type="types.service"
          :action="actions.create"
          button
        />
      </div>
    </template>
  </contents-wrap>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { sanitizer } from '@/utils/common-utils'
import {
  contentDataTypes,
  contentActionTypes,
} from '~/composable/content-helper'
import { useServiceList } from '@/composable/use-service-data'
import { useAuthenticated } from '@/composable/use-authenticated'
import ContentsWrap from '@/components/molecules/contents-wrap.vue'
import SectionContentEyecatcher from '@/components/molecules/section-content-eyecatcher.vue'
import ContentsGrid from '@/components/molecules/contents-grid.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Services',
  components: {
    ContentsWrap,
    ContentsGrid,
    SectionContentEyecatcher,
    ContentEditActivator,
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

    const { isAuthenticated } = useAuthenticated()

    return {
      serviceList,
      serviceBodyHtml,
      loading,
      notFound,
      changeServicesPosition,
      types: contentDataTypes,
      actions: contentActionTypes,
      isAuthenticated,
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
