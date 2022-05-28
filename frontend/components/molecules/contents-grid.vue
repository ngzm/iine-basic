<template>
  <div>
    <div v-if="isEditable">
      <p class="draggable-notion">ドラッグドロップで位置を変更できます</p>
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
          <div class="edit-position">
            <b-icon icon="arrows-move" variant="primary" />
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
import { usePreviewControll } from '@/composable/use-edit-controll'

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
    const { isEditable } = usePreviewControll()

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
    padding: 1rem;
    width: 95%;
    text-align: center;
  }
  .column-draggable {
    position: relative;
    width: 75%;
    cursor: grab;
    background-color: lightsteelblue;
    border-radius: 6px;
    box-shadow: 0 0 8px royalblue;
    .edit-activator {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .edit-position {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
    }
  }
  .column-draggable:active {
    cursor: grabbing;
  }
}

.draggable-notion {
  text-align: center;
  font-size: small;
  font-weight: bold;
  color: blue;
}
</style>
