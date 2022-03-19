<template>
  <div class="content-edit-activator">
    <b-avatar
      button
      :icon="avatorIcon"
      :size="avatorSize"
      :variant="avatorVariant"
      @click="activateToEdit()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, reactive, computed } from '@vue/composition-api'
import { contentDataTypes, ContentDataType, contentActionTypes, ContentActionType } from '@/composable/content-helper'

const activator = reactive({
  show: false,
  type: contentDataTypes.none as ContentDataType,
  action: contentActionTypes.none as ContentActionType,
  id: 0
})

export const getActivator = () => activator

export default defineComponent({
  name: 'ContentEditActivator',
  props: {
    type: {
      type: String as PropType<ContentDataType>,
      required: true
    },
    action: {
      type: String as PropType<ContentActionType>,
      required: true
    },
    contentId: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '2.5em'
    },
    variant: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { type, action, contentId, size, variant } = toRefs(props)

    const action2icon = {
      [contentActionTypes.create]: 'plus-circle',
      [contentActionTypes.update]: 'pencil-square',
      [contentActionTypes.moddel]: 'pencil-fill',
      [contentActionTypes.none]: 'exclamation-triangle',
    } as const
    const action2variant = {
      [contentActionTypes.create]: 'info',
      [contentActionTypes.update]: 'success',
      [contentActionTypes.moddel]: 'success',
      [contentActionTypes.none]: 'danger',
    } as const

    const avatorIcon = computed(() => action2icon[action.value])
    const avatorVariant = computed(() => variant.value || action2variant[action.value])
    const avatorSize = computed(() => size.value)

    const activateToEdit = () => {
      Object.assign(activator, {
        show: true,
        type: type.value,
        action: action.value,
        id: contentId.value
      })
    }

    return {
      avatorIcon,
      avatorVariant,
      avatorSize,
      activateToEdit,
    }
  },
})
</script>

<style lang="scss" scoped>
.content-edit-activator {
  display: inline-block;
}
</style>
