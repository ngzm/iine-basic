<template>
  <div class="file-input">
    <div
      class="file-input__drag-drop"
      :class="{
        'darg-enter': isDragEnter,
        'ok-state': state === true,
        'error-state': state === false,
      }"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent="onDragOver"
      @drop.prevent="onDropFile"
    >
      <div class="file-input__drag-drop--img">
        <img :src="displayImage" :alt="displayImage" />
      </div>
      <div class="file-input__drag-drop--nav">
        <p>
          ここに画像ファイルを<br/>ドラッグ＆ドロップできます
        </p>
        <div class="file-input__drag-drop--nav-action">
          <b-button
            variant="primary"
            @click="onClick"
          >
            背景画像ファイルを選択
          </b-button>
        </div>
      </div>
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
import { defineComponent, ref, computed, onMounted } from '@nuxtjs/composition-api'
import { noImage } from '@/utils/common-utils'

export default defineComponent({
  name: 'FilrInput',
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    state: {
      type: Boolean,
      default: null
    }
  },
  setup(props, { emit, refs }) {
    const isDragEnter = ref(false)
    const fileInputInput = ref<HTMLInputElement>()
    const imageFile = ref<File>()

    const displayImage = computed(() => (
      props.imageUrl && props.imageUrl.length > 0 ? props.imageUrl : noImage
    ))

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
      displayImage,
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
@import '@/assets/scss/style.scss';

.file-input {
  &__drag-drop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: lightgray;
    border: 1px solid gray;
    &--img {
      padding: 1rem;
      img {
        width: 240px;
        height: 200px;
        object-fit: cover;
      }
    }
    &--nav {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      &-action {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }
  }
  .darg-enter {
    opacity: 0.5;
    cursor: copy;
  }
  .ok-state {
    border-color: $green;
  }
  .error-state {
    border-color: $red;
  }
}
</style>
