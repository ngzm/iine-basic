<template>
  <div class="information-form"> 
    <p class="information-form__input">
      <label for="information-form-input-image">タイトル背景画像</label>
      <file-input
        id="information-form-input-image"
        :image-url="informationForm.image.$value"
        :state="validStateImage"
        @change-image-file="onChangeImageFile"
      />
      <b-form-invalid-feedback :state="validStateImage">
        <span v-for="(err, inx) in informationForm.image.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="information-form__input">
      <label for="information-form-input-title">タイトル</label>
      <b-form-input
        id="information-form-input-title"
        v-model="informationForm.title.$value"
        :state="validStateTitle"
      />
      <b-form-invalid-feedback :state="validStateTitle">
        <span v-for="(err, inx) in informationForm.title.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="information-form__input">
      <label for="information-form-input-subtitle">サブタイトル</label>
      <b-form-input
        id="information-form-input-subtitle"
        v-model="informationForm.subtitle.$value"
        :state="validStateSubtitle"
      />
      <b-form-invalid-feedback :state="validStateSubtitle">
        <span v-for="(err, inx) in informationForm.subtitle.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="information-form__input">
      <label for="information-form-input-body">本文</label>
      <b-form-textarea
        id="information-form-input-body"
        v-model="informationForm.body.$value"
        rows="6"
        max-rows="18"
        :state="validStateBody"
      />
      <b-form-invalid-feedback :state="validStateBody">
        <span v-for="(err, inx) in informationForm.body.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="information-form__action">
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
import { defineComponent, onMounted, ref, computed } from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/composable/form-validators'
import { InformationFormType } from '~/types/content-type'
import informationHandler from '@/composable/information-handler'
import FileInput from '@/components/atoms/file-input.vue'

export default defineComponent({
  name: 'InformationForm',
  components: { FileInput },
  setup(_props, { emit }) {
    const { getInformation, updateInformation } = informationHandler()
    const information = computed(() => getInformation())

    const informationForm = useValidation({
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
          $message: ref('タイトル背景画像ファイルを設定してください'),
        },
      },
      imageFile: {
        $value: ref<File|null>(null),
      },
      body: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('本文を入力してください'),
        },
        maximunLength: {
          $validator: maximunLength(1000),
          $message: ref('1000文字以内で入力してください'),
        },
      },
    })

    const validStateTitle = computed(() => !informationForm.title.$dirty ? null : !informationForm.title.$anyInvalid)
    const validStateSubtitle = computed(() => !informationForm.subtitle.$dirty ? null : !informationForm.subtitle.$anyInvalid)
    const validStateImage = computed(() => !informationForm.image.$dirty ? null : !informationForm.image.$anyInvalid)
    const validStateBody = computed(() => !informationForm.body.$dirty ? null : !informationForm.body.$anyInvalid)

    onMounted(() => {
      informationForm.id.$value = information.value.id || 0
      informationForm.title.$value = information.value.title || ''
      informationForm.subtitle.$value = information.value.subtitle || ''
      informationForm.image.$value = information.value.image || ''
      informationForm.body.$value = information.value.body || ''
    })

    const onChangeImageFile =(imageFile: File) => {
      informationForm.imageFile.$value = imageFile
      informationForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onUpdate = () => {
      informationForm.$touch()
      if (informationForm.$anyInvalid) return

      const formData = informationForm.toObject()
      const updateData: InformationFormType = {
        id: formData.id,
        title: formData.title,
        subtitle: formData.subtitle,
        image: formData.image,
        imageFile: formData.imageFile,
        body: formData.body
      }
      updateInformation(updateData)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    return {
      informationForm,
      validStateTitle,
      validStateSubtitle,
      validStateImage,
      validStateBody,
      onChangeImageFile,
      onUpdate,
      onCancel
    }
  },
})
</script>

<style lang="scss" scoped>
.information-form {
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
