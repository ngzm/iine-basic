<template>
  <b-modal
    v-model="activator.show"
    centered
    size="lg"
    title="コンテンツの編集"
    hide-footer
  >
    <component
      :is="formComponentName"
      :data-id="dataId"
      @close="activator.show = false"
    />
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { editTypes, getActivator } from '@/components/organisms/layout/content-edit-activator.vue'
import EyecatcherForm from '@/components/organisms/eyecatcher-form.vue'
import InformationForm from '@/components/organisms/information-form.vue'
import newsForm from '@/components/organisms/news-form.vue'

const editType2Component = {
  [editTypes.eyecatch]: 'EyecatcherForm',
  [editTypes.information]: 'InformationForm',
  [editTypes.news]: 'newsForm',
  [editTypes.service]: 'InformationForm',
  [editTypes.work]: 'InformationForm',
  [editTypes.contact]: 'InformationForm',
  [editTypes.menu]: 'InformationForm',
  [editTypes.none]: 'NoneForm',
}

export default defineComponent({
  name: 'ContentEditModal',
  components: {
    EyecatcherForm,
    InformationForm,
    newsForm,
  },
  setup() {
    const activator = computed(() => getActivator())
    const formComponentName = computed(() => editType2Component[activator.value.type])
    const dataId = computed(() => activator.value.id )

    return {
      activator,
      formComponentName,
      dataId
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
