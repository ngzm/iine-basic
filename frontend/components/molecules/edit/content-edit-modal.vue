<template>
  <b-modal
    v-model="showModal"
    :title="formTitle"
    centered
    size="lg"
    hide-footer
  >
    <component
      :is="formComponentName"
      :edit-props="editProps"
      class="g-theme-edit-contents"
      @close="inactivate"
    />
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import {
  useEditControll,
  usePreviewControll,
} from '@/composable/use-edit-controll'
import EyecatcherForm from '@/components/organisms/home/eyecatcher-form.vue'
import InformationForm from '@/components/organisms/information/information-form.vue'
import NewsForm from '@/components/organisms/news/news-form.vue'
import ServiceForm from '@/components/organisms/service/service-form.vue'
import ContactForm from '@/components/organisms/contact/contact-form.vue'
import NoneForm from '~/components/atoms/do-nothing.vue'

export default defineComponent({
  name: 'ContentEditModal',
  components: {
    EyecatcherForm,
    InformationForm,
    NewsForm,
    ServiceForm,
    ContactForm,
    NoneForm,
  },
  setup() {
    const { isEditable } = usePreviewControll()
    const {
      getActivator,
      inactivate,
      setActivatorShow,
      getFormComponent,
      getFormTitle,
    } = useEditControll()

    const activator = getActivator()
    const formComponentName = computed(() => getFormComponent(activator))
    const formTitle = computed(() => getFormTitle(activator))

    const showModal = computed({
      get: () => isEditable.value && (activator.show ?? false),
      set: (value: boolean) => {
        setActivatorShow(value)
      },
    })

    return {
      showModal,
      editProps: activator,
      formComponentName,
      formTitle,
      inactivate,
    }
  },
})
</script>
