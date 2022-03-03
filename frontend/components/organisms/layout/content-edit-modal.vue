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
    <p class="my-3">{{ activator.type }}</p>
    <p class="my-3">{{ activator.id }}</p>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import EyecatcherForm from '@/components/organisms/eyecatcher-form.vue'

export const editTypes = {
  eyecatch: 'eyecatch',
  information: 'inforamtion',
  news: 'news',
  service: 'service',
  work: 'work',
  contact: 'contact',
  menu: 'menu',
  none: 'none'
} as const

type EditType = typeof editTypes[keyof typeof editTypes];

const activator = reactive({
  show: false,
  type: editTypes.none,
  id: 0
})

export const activateToEdit = (type: EditType, id: number = 0) => {
  Object.assign(activator, {
    show: true,
    type,
    id
  })
}

export default defineComponent({
  name: 'ContentEditModal',
  components: {
    EyecatcherForm,
  },
  setup() {
    const formComponentName = computed(() => 'EyecatcherForm')
    const dataId = computed(() => activator.id )

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
