<template>
  <div>
    <div v-if="isAuthenticated">
      <p class="text-center">
        <small>ドラッグドロップで位置を変更できます</small>
      </p>
      <draggable v-model="draggableList" tag="div" class="contents-grid">
        <section
          v-for="content in draggableList"
          :key="content.id"
          class="contents-grid__column column-draggable"
        >
          <slot :content="content" />

          <div class="edit-activator">
            <slot name="editActivator" :content="content" />
          </div>
        </section>
      </draggable>
    </div>

    <div v-else>
      <div class="contents-grid">
        <section
          v-for="content in contentsList"
          :key="content.id"
          class="contents-grid__column"
        >
          <slot :content="content" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import draggable from 'vuedraggable'
import {
  ContentType,
  NewsType,
  ServiceType,
  WorkType,
} from '@/types/content-types'

type ColsType = ContentType | NewsType | ServiceType | WorkType

export default defineComponent({
  name: 'ContentsGridDraggable',
  components: { draggable },
  props: {
    contentsList: {
      type: Array as PropType<ColsType[]>,
      required: true,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const draggableList = computed({
      get: () => props.contentsList,
      set: (list) => {
        emit('change', list)
      },
    })
    return { draggableList }
  },
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
    .edit-activator {
      position: absolute;
      top: 0;
      left: 2rem;
    }
  }
  .column-draggable {
    cursor: grab;
  }
  .column-draggable:active {
    cursor: grabbing;
  }
}
</style>
