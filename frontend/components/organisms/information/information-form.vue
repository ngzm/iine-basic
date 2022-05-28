<template>
  <contentsform-wrap :overlay="loading">
    <form class="information-form">
      <div class="information-form__input">
        <label for="information-form-input-image">タイトル背景画像</label>
        <file-input
          id="information-form-input-image"
          :image-url="informationForm.image.$value"
          :state="validStateImage"
          :buzy="compressing"
          @change-image-file="onChangeImageFile"
        />
        <b-form-invalid-feedback :state="validStateImage">
          <span v-for="(err, inx) in informationForm.image.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="information-form__input">
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
      </div>
      <div class="information-form__input">
        <label for="information-form-input-subtitle">サブタイトル</label>
        <b-form-input
          id="information-form-input-subtitle"
          v-model="informationForm.subtitle.$value"
          :state="validStateSubtitle"
        />
        <b-form-invalid-feedback :state="validStateSubtitle">
          <span
            v-for="(err, inx) in informationForm.subtitle.$errors"
            :key="inx"
          >
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="information-form__input">
        <label for="information-form-input-body">本文</label>
        <wysiwsg-editor
          id="information-form-input-body"
          v-model="informationForm.body.$value"
          :state="validStateBody"
        />
        <b-form-invalid-feedback :state="validStateBody">
          <span v-for="(err, inx) in informationForm.body.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="information-form__action">
        <b-button
          v-show="isCreate"
          variant="info"
          :disabled="compressing"
          @click="onCreate"
        >
          作成する
        </b-button>
        <b-button
          v-show="isUpdate"
          variant="success"
          :disabled="compressing"
          @click="onUpdate"
        >
          更新する
        </b-button>
        <b-button @click="onCancel">キャンセル</b-button>
      </div>
    </form>
  </contentsform-wrap>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  PropType,
} from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/utils/form-validators'
import { EditProps, useEditControll } from '@/composable/use-edit-controll'
import { InformationType } from '@/types/content-types'
import { useInformationData } from '@/composable/use-information-data'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useImageCompression } from '@/composable/use-image-compression'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'InformationForm',
  components: { ContentsformWrap, FileInput, WysiwsgEditor },
  props: {
    editProps: {
      type: Object as PropType<EditProps>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const contentId = props.editProps.id ?? 0
    const { isCreateAction, isUpdateAction } = useEditControll()

    const { customerId } = useCurrentCustomer()
    const { compressing, compress } = useImageCompression()
    const {
      information,
      loadInformation,
      createInformation,
      updateInformation,
      loading,
      endLoading,
    } = useInformationData()

    const informationForm = useValidation({
      title: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('タイトルを入力してください'),
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
        $value: ref<File | null>(null),
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

    onMounted(async () => {
      if (isCreate.value) {
        endLoading()
        return
      }
      await loadInformation(contentId)
      informationForm.title.$value = information.title || ''
      informationForm.subtitle.$value = information.subtitle || ''
      informationForm.image.$value = information.image?.url || ''
      informationForm.body.$value = information.body || ''
    })

    const validStateTitle = computed(() =>
      !informationForm.title.$dirty ? null : !informationForm.title.$anyInvalid
    )
    const validStateSubtitle = computed(() =>
      !informationForm.subtitle.$dirty
        ? null
        : !informationForm.subtitle.$anyInvalid
    )
    const validStateImage = computed(() =>
      !informationForm.image.$dirty ? null : !informationForm.image.$anyInvalid
    )
    const validStateBody = computed(() =>
      !informationForm.body.$dirty ? null : !informationForm.body.$anyInvalid
    )

    const onChangeImageFile = async (imageFile: File) => {
      const { compressedImageFile, compressedImageUrl } = await compress(
        imageFile
      )
      informationForm.imageFile.$value = compressedImageFile
      informationForm.image.$value = compressedImageUrl
    }

    const onCreate = async () => {
      informationForm.$touch()
      if (informationForm.$anyInvalid) return

      const formData = informationForm.toObject()
      const infomationData = {
        id: 0,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await createInformation(infomationData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      informationForm.$touch()
      if (informationForm.$anyInvalid) return

      const formData = informationForm.toObject()
      const infomationData: InformationType = {
        id: contentId,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await updateInformation(contentId, infomationData, imageFile)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    const isCreate = computed(() => isCreateAction(props.editProps.action))
    const isUpdate = computed(() => isUpdateAction(props.editProps.action))

    return {
      informationForm,
      validStateTitle,
      validStateSubtitle,
      validStateImage,
      validStateBody,
      onChangeImageFile,
      onCreate,
      onUpdate,
      onCancel,
      loading,
      compressing,
      isCreate,
      isUpdate,
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
