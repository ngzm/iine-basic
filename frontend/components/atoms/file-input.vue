<template>
  <div class="file-input">
    <div
      class="file-input__drag-drop"
      :class="{ 'darg-enter': isDragEnter }"
      :style="{ 'background-image': `url(${imageUrl})` }"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent="onDragOver"
      @drop.prevent="onDropFile"
    >
      <p class="file-input__drag-drop--nav">
        ここに画像ファイルを<br/>ドラッグ＆ドロップできます
      </p>
      <p class="file-input__drag-drop--action">
        <b-button
          variant="primary"
          @click="onClick"
        >
          背景画像ファイルを選択
        </b-button>
      </p>
    </div>
    <input
      ref="fileInputInput"
      type="file"
      hidden
      @change="onChangeFile"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'FilrInput',
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },
  setup(_props, { emit, refs }) {
    const isDragEnter = ref(false)
    const fileInputInput = ref<HTMLInputElement>()
    const imageFile = ref<File>()

    onMounted(() => {
      // TODO: refs
      // V3コード修正あり - V2 @vue/composition-api 特有コード
      fileInputInput.value = refs.fileInputInput as HTMLInputElement
    })

    const onDragEnter = () => { isDragEnter.value = true; }
    const onDragLeave = () => { isDragEnter.value = false; }
    const onDragOver = () => { isDragEnter.value = true; }

    const onClick = () => {
      fileInputInput.value && fileInputInput.value.click()
    }

    const onDropFile = (e: DragEvent) => {
      isDragEnter.value = false
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        imageFile.value = e.dataTransfer.files[0]
        emit('change-image-file', imageFile.value)
      }
    }

    const onChangeFile = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      if (target && target.files && target.files[0]) {
        imageFile.value = target.files[0]
        emit('change-image-file', imageFile.value)
      }
    }

    return {
      isDragEnter,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDropFile,
      onClick,
      onChangeFile
    }
  },
})
</script>

<style lang="scss" scoped>
.file-input {
  &__drag-drop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: calc(100vh - 700px);
    min-height: 200px;
    max-height: 400px;
    background-color: lightgray;
    background-position: center center;
    background-size: cover;
    &--nav {
      padding: 1rem;
      background-color: rgba($color: #000000, $alpha: 0.5);
      color: white;
    }
    &--action {
      padding: 1rem;
    }
  }
  .darg-enter {
    border: 2px solid black;
    opacity: 0.5;
    cursor: copy;
  }
}
</style>
