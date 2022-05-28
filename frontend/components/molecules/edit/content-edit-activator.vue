<template>
  <div v-if="isEditable" class="content-edit-activator">
    <template v-if="button">
      <b-button :variant="activatorVariant" @click="activateToEdit">
        作成する
      </b-button>
    </template>
    <template v-else>
      <b-avatar
        button
        :icon="activatorIcon"
        :size="size"
        :variant="activatorVariant"
        @click="activateToEdit"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import {
  EditProps,
  useEditControll,
  usePreviewControll,
} from '@/composable/use-edit-controll'

export default defineComponent({
  name: 'ContentEditActivator',
  props: {
    editProps: {
      type: Object as PropType<EditProps>,
      required: true,
    },
    size: {
      type: String,
      default: '2.5em',
    },
    variant: {
      type: String,
      default: '',
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { isEditable } = usePreviewControll()
    const { activate, getActivatorIcon, getActivatorColor } = useEditControll()

    const activatorIcon = computed(() => getActivatorIcon(props.editProps))
    const activatorVariant = computed(() => getActivatorColor(props.editProps))

    const activateToEdit = () => {
      activate(props.editProps)
    }

    return {
      isEditable,
      activatorIcon,
      activatorVariant,
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
