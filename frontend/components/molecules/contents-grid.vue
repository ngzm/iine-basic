<template>
  <div>
    <div v-if="isEditable">
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
import { useAuthenticated } from '@/composable/use-authenticated'

type ColsType = ContentType | NewsType | ServiceType | WorkType

export default defineComponent({
  name: 'ContentsGridDraggable',
  components: { draggable },
  props: {
    contentsList: {
      type: Array as PropType<ColsType[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { isEditable } = useAuthenticated()

    const draggableList = computed({
      get: () => props.contentsList,
      set: (list) => {
        emit('change', list)
      },
    })
    return {
      isEditable,
      draggableList,
    }
  },
})
</script>

<style lang="scss" scoped>
.contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 22rem));
  justify-items: center;
  justify-content: space-around;
  row-gap: 2rem;
  margin: 2rem auto 0 auto;
  padding: 0 2rem;
  max-width: 90rem;
  min-height: 18rem;
  &__column {
    position: relative;
    padding: 1rem;
    width: 100%;
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
