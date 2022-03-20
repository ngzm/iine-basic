<template>
  <b-modal
    v-model="showModal"
    :title="modalTitle"
    centered
    size="lg"
    hide-footer
  >
    <component
      :is="formComponentName"
      :action="action"
      :data-id="dataId"
      @close="close"
    />
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from '@vue/composition-api'
import { contentDataTypes, contentActionTypes } from '@/composable/content-helper'
import { getActivator } from '@/components/organisms/layout/content-edit-activator.vue'
import EyecatcherForm from '@/components/organisms/home/eyecatcher-form.vue'
import InformationForm from '@/components/organisms/information/information-form.vue'
import NewsForm from '@/components/organisms/news/news-form.vue'
import ServiceForm from '@/components/organisms/service/service-form.vue'
import ContactForm from '@/components/organisms/contact/contact-form.vue'

const editType2Component = {
  [contentDataTypes.eyecatch]: 'EyecatcherForm',
  [contentDataTypes.information]: 'InformationForm',
  [contentDataTypes.news]: 'NewsForm',
  [contentDataTypes.service]: 'ServiceForm',
  [contentDataTypes.work]: 'InformationForm',
  [contentDataTypes.contact]: 'ContactForm',
  [contentDataTypes.menu]: 'InformationForm',
  [contentDataTypes.none]: 'NoneForm',
} as const

export default defineComponent({
  name: 'ContentEditModal',
  components: {
    EyecatcherForm,
    InformationForm,
    NewsForm,
    ServiceForm,
    ContactForm,
  },
  setup() {
    const { show, type, action, id } = toRefs(getActivator())
    const formComponentName = computed(() => editType2Component[type.value])
    const modalTitle = computed(() => (
      action.value === contentActionTypes.create
        ? 'コンテンツの追加'
        : action.value === contentActionTypes.moddel
          ? 'コンテンツの編集・削除'
          : 'コンテンツの編集'
    ))
    const close = () => { show.value = false }

    return {
      showModal: show,
      action,
      dataId: id,
      formComponentName,
      modalTitle,
      close
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
