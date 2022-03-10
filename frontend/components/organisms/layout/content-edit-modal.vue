<template>
  <b-modal
    v-model="showModal"
    centered
    size="lg"
    title="コンテンツの編集"
    hide-footer
  >
    <component
      :is="formComponentName"
      :data-id="dataId"
      @close="close"
    />
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, unref } from '@vue/composition-api'
import { contentDataTypes } from '@/composable/use-content-helper'
import { getActivator } from '@/components/organisms/layout/content-edit-activator.vue'
import EyecatcherForm from '@/components/organisms/eyecatcher-form.vue'
import InformationForm from '@/components/organisms/information-form.vue'
import newsForm from '@/components/organisms/news-form.vue'

const editType2Component = {
  [contentDataTypes.eyecatch]: 'EyecatcherForm',
  [contentDataTypes.information]: 'InformationForm',
  [contentDataTypes.news]: 'newsForm',
  [contentDataTypes.service]: 'InformationForm',
  [contentDataTypes.work]: 'InformationForm',
  [contentDataTypes.contact]: 'InformationForm',
  [contentDataTypes.menu]: 'InformationForm',
  [contentDataTypes.none]: 'NoneForm',
}

export default defineComponent({
  name: 'ContentEditModal',
  components: {
    EyecatcherForm,
    InformationForm,
    newsForm,
  },
  setup() {
    const activator = toRefs(getActivator())
    const formComponentName = computed(() => editType2Component[unref(activator.type)])
    const close = () => { activator.show.value = false }

    return {
      showModal: activator.show,
      dataId: activator.id,
      formComponentName,
      close
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
