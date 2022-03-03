<template>
  <div class="file-input">
    <div
      class="file-input__drag-drop"
      :class="{ 'darg-enter': isDragEnter }"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent="onDragOver"
      @drop.prevent="onDropFile"
      @click="onClick"
    >
      <p>
        画像ファイルをドラッグ＆ドロップできます
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
  setup(_propd, { refs }) {
    const isDragEnter = ref(false)
    const fileInputInput = ref<HTMLInputElement>()
    const file = ref<File>()

    onMounted(() => {
      // TODO:
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
      console.log('onDropFile')
      console.log('e', e)

      isDragEnter.value = false
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        file.value = e.dataTransfer.files[0]
      }
      console.log('file', file.value)
    }

    interface FileInputEvent extends Event {
      target: FileInputEvent & EventTarget;
    }

    const onChangeFile = (e: FileInputEvent) => {
      console.log('onChangeFile')
      console.log('e', e)

      if (e.target && e.target.files && e.target.files[0]) {
        file.value = e.target.files[0]
      }
      console.log('file', file.value)
    }

    return {
      file,
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
    border: 1px dashed #dbdddc;
    min-height: 250px;
    p {
      padding: 1rem;
      background-color: rgba($color: #000000, $alpha: 0.5);
      color: white;
    }
  }
  .darg-enter {
    border: 1px dashed #76767d;
    cursor: copy;
  }
}
</style>
