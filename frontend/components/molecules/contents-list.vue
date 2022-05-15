<template>
  <ul class="content-list">
    <li v-for="content in contents" :key="content.id">
      <div class="edit-activator">
        <slot name="editActivator" :content="content" />
      </div>
      <div>
        <slot :content="content" />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ContentType } from '@/types/content-types'

export default defineComponent({
  name: 'NewsList',
  props: {
    contents: {
      type: Array as PropType<ContentType[]>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
ul.content-list {
  li {
    margin-top: 0.5rem;
    position: relative;
    .edit-activator {
      position: absolute;
      top: 0;
      left: -2rem;
    }
  }
}
</style>
