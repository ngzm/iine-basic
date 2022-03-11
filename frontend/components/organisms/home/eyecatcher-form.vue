<template>
  <div class="eyecatcher-form"> 
    <p class="eyecatcher-form__input">
      <label for="eyecatcher-form-input-image">トップ背景画像</label>
      <file-input
        id="eyecatcher-form-input-image"
        :image-url="eyecatcherForm.image.$value"
        :state="validStateImage"
        @change-image-file="onChangeImageFile"
      />
      <b-form-invalid-feedback :state="validStateImage">
        <span v-for="(err, inx) in eyecatcherForm.image.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="eyecatcher-form__input">
      <label for="eyecatcher-form-input-title">トップタイトル</label>
      <b-form-input
        id="eyecatcher-form-input-title"
        v-model="eyecatcherForm.title.$value"
        :state="validStateTitle"
      />
      <b-form-invalid-feedback :state="validStateTitle">
        <span v-for="(err, inx) in eyecatcherForm.title.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="eyecatcher-form__input">
      <label for="eyecatcher-form-input-subtitle">サブタイトル</label>
      <b-form-input
        id="eyecatcher-form-input-subtitle"
        v-model="eyecatcherForm.subtitle.$value"
        :state="validStateSubtitle"
      />
      <b-form-invalid-feedback :state="validStateSubtitle">
        <span v-for="(err, inx) in eyecatcherForm.subtitle.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="eyecatcher-form__action">
      <b-button @click="onCancel">
        キャンセル
      </b-button>
      <b-button variant="primary" @click="onUpdate">
        更新する
      </b-button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/composable/form-validators'
import { useEyecatchData } from '@/composable/use-eyecatch-data'
import FileInput from '@/components/atoms/file-input.vue'

export default defineComponent({
  name: 'EyeCatcherForm',
  components: { FileInput },
  setup(_props, { emit }) {
    const { eyecatch, loadEyecatch, updateEyecatch } = useEyecatchData(1)
    const eyecatcherForm = useValidation({
      id: {
        $value: ref(0),
      },
      title: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('トップタイトルを入力してください'),
        },
        maximunLength: {
          $validator: maximunLength(40),
          $message: ref('40文字以内で入力してください'),
        },
      },
      subtitle: {
        $value: ref(''),
        maximunLength: {
          $validator: maximunLength(50),
          $message: ref('50文字以内で入力してください'),
        },
      },
      image: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('トップ背景画像ファイルを設定してください'),
        },
      },
      imageFile: {
        $value: ref<File|null>(null),
      }
    })

    onMounted(async () => {
      await loadEyecatch()
      eyecatcherForm.id.$value = eyecatch.value.id || 0
      eyecatcherForm.title.$value = eyecatch.value.title || ''
      eyecatcherForm.subtitle.$value = eyecatch.value.subtitle || ''
      eyecatcherForm.image.$value = eyecatch.value.image || ''
    })

    const validStateTitle = computed(() => !eyecatcherForm.title.$dirty ? null : !eyecatcherForm.title.$anyInvalid)
    const validStateSubtitle = computed(() => !eyecatcherForm.subtitle.$dirty ? null : !eyecatcherForm.subtitle.$anyInvalid)
    const validStateImage = computed(() => !eyecatcherForm.image.$dirty ? null : !eyecatcherForm.image.$anyInvalid)

    const onChangeImageFile =(imageFile: File) => {
      eyecatcherForm.imageFile.$value = imageFile
      eyecatcherForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onUpdate = async () => {
      eyecatcherForm.$touch()
      if (eyecatcherForm.$anyInvalid) return

      const formData = eyecatcherForm.toObject()
      const ecData = {
        id: formData.id,
        title: formData.title,
        subtitle: formData.subtitle,
        image: formData.image,
      }
      const imageFile = formData.imageFile as File || null
      await updateEyecatch(ecData, imageFile)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    return {
      eyecatcherForm,
      validStateTitle,
      validStateSubtitle,
      validStateImage,
      onChangeImageFile,
      onUpdate,
      onCancel
    }
  },
})
</script>

<style lang="scss" scoped>
.eyecatcher-form {
  &__input {
    margin-bottom: 1rem;
  }
  &__action {
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-align: right;
  }
}
</style>
