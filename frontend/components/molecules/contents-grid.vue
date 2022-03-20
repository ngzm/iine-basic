<template>
  <div class="contents-grid">
    <section
      v-for="content in contentsList"
      :key="content.id"
      class="contents-grid__column"
    >
      <slot :content="content" />

      <div class="edit-activator">
        <slot name="editActivator" :content="content" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ContentType, NewsType, ServiceType, WorkType } from '@/types/content-type'

type ColsType = ContentType | NewsType | ServiceType | WorkType

export default defineComponent({
  name: 'ContentsGrid',
  props: {
    contentsList: {
      type: Array as PropType<ColsType[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.contents-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 90rem;
  min-height: 18rem;
  &__column {
    position: relative;
    margin: 1.8rem 1.5rem 0 1.5rem;
    padding: 0;
    max-width: 20rem;
    min-width: 16rem;
    text-align: center;
    .edit-activator{
      position: absolute;
      top: 0;
      left: 2rem;
    }
  }
}
</style>
