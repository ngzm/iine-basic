<template>
  <contentsform-wrap :overlay="loading">
    <form class="eyecatcher-form">
      <div class="eyecatcher-form__input">
        <label for="eyecatcher-form-input-image">トップ背景画像</label>
        <file-input
          id="eyecatcher-form-input-image"
          :image-url="eyecatcherForm.image.$value"
          :state="validStateImage"
          :buzy="compressing"
          @change-image-file="onChangeImageFile"
        />
        <b-form-invalid-feedback :state="validStateImage">
          <span v-for="(err, inx) in eyecatcherForm.image.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="eyecatcher-form__input">
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
      </div>
      <div class="eyecatcher-form__input">
        <label for="eyecatcher-form-input-subtitle">サブタイトル</label>
        <b-form-input
          id="eyecatcher-form-input-subtitle"
          v-model="eyecatcherForm.subtitle.$value"
          :state="validStateSubtitle"
        />
        <b-form-invalid-feedback :state="validStateSubtitle">
          <span
            v-for="(err, inx) in eyecatcherForm.subtitle.$errors"
            :key="inx"
          >
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="eyecatcher-form__action">
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
  ref,
  computed,
  onMounted,
  PropType,
} from '@nuxtjs/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/utils/form-validators'
import { EditProps, useEditControll } from '@/composable/use-edit-controll'
import { useEyecatchData } from '@/composable/use-eyecatch-data'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useImageCompression } from '@/composable/use-image-compression'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'

export default defineComponent({
  name: 'EyeCatcherForm',
  components: { ContentsformWrap, FileInput },
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
      eyecatch,
      loadEyecatch,
      createEyecatch,
      updateEyecatch,
      loading,
      endLoading,
    } = useEyecatchData()

    const eyecatcherForm = useValidation({
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
        $value: ref<File | null>(null),
      },
    })

    onMounted(async () => {
      if (isCreate.value) {
        endLoading()
        return
      }
      await loadEyecatch(contentId)
      eyecatcherForm.title.$value = eyecatch.title || ''
      eyecatcherForm.subtitle.$value = eyecatch.subtitle || ''
      eyecatcherForm.image.$value = eyecatch.image.url || ''
    })

    const validStateTitle = computed(() =>
      !eyecatcherForm.title.$dirty ? null : !eyecatcherForm.title.$anyInvalid
    )
    const validStateSubtitle = computed(() =>
      !eyecatcherForm.subtitle.$dirty
        ? null
        : !eyecatcherForm.subtitle.$anyInvalid
    )
    const validStateImage = computed(() =>
      !eyecatcherForm.image.$dirty ? null : !eyecatcherForm.image.$anyInvalid
    )

    const onChangeImageFile = async (imageFile: File) => {
      const { compressedImageFile, compressedImageUrl } = await compress(
        imageFile
      )
      eyecatcherForm.imageFile.$value = compressedImageFile
      eyecatcherForm.image.$value = compressedImageUrl
    }

    const onCreate = async () => {
      eyecatcherForm.$touch()
      if (eyecatcherForm.$anyInvalid) return

      const formData = eyecatcherForm.toObject()
      const ecData = {
        id: 0,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        image: eyecatch.image,
      }
      const imageFile = (formData.imageFile as File) || null
      await createEyecatch(ecData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      eyecatcherForm.$touch()
      if (eyecatcherForm.$anyInvalid) return

      const formData = eyecatcherForm.toObject()
      const ecData = {
        id: contentId,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        image: eyecatch.image,
      }
      const imageFile = (formData.imageFile as File) || null
      await updateEyecatch(contentId, ecData, imageFile)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    const isCreate = computed(() => isCreateAction(props.editProps.action))
    const isUpdate = computed(() => isUpdateAction(props.editProps.action))

    return {
      eyecatcherForm,
      validStateTitle,
      validStateSubtitle,
      validStateImage,
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
