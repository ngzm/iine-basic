<template>
  <div class="text-center">
    <h4 class="my-3">コンテンツが登録されていません</h4>
    <content-edit-activator :edit-props="editProps" button />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { EditTypeKey, editActions } from '@/composable/use-edit-controll'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'

export default defineComponent({
  name: 'ContentRequired',
  components: { ContentEditActivator },
  props: {
    type: {
      type: String as PropType<EditTypeKey>,
      required: true,
    },
  },
  setup(props) {
    return {
      editProps: {
        type: props.type,
        action: editActions.create,
      },
    }
  },
})
</script>
