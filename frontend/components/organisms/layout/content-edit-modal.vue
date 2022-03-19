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
      :action="action"
      :data-id="dataId"
      @close="close"
    />
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from '@vue/composition-api'
import { contentDataTypes } from '@/composable/content-helper'
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
    const close = () => { show.value = false }

    return {
      showModal: show,
      action,
      dataId: id,
      formComponentName,
      close
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
