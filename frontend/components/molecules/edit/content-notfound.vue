<template>
  <div class="text-center">
    <h4 class="my-3">コンテンツが登録されていません</h4>
    <content-edit-activator :type="type" :action="action" button />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { ContentDataType, ContentActionType } from '@/composable/content-helper'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'

export default defineComponent({
  name: 'ContentRequired',
  components: { ContentEditActivator },
  props: {
    type: {
      type: String as PropType<ContentDataType>,
      required: true,
    },
    action: {
      type: String as PropType<ContentActionType>,
      required: true,
    },
  },
})
</script>
