<template>
  <contentsform-wrap :overlay="loading || confirmDelete">
    <form class="service-form">
      <div class="service-form__input">
        <label for="service-form-input-image">タイトル背景画像</label>
        <file-input
          id="service-form-input-image"
          :image-url="serviceForm.image.$value"
          :state="validStateImage"
          :buzy="compressing"
          @change-image-file="onChangeImageFile"
        />
        <b-form-invalid-feedback :state="validStateImage">
          <span v-for="(err, inx) in serviceForm.image.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="service-form__input">
        <label for="service-form-input-title">タイトル</label>
        <b-form-input
          id="service-form-input-title"
          v-model="serviceForm.title.$value"
          :state="validStateTitle"
        />
        <b-form-invalid-feedback :state="validStateTitle">
          <span v-for="(err, inx) in serviceForm.title.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="service-form__input">
        <label for="service-form-input-body">本文</label>
        <wysiwsg-editor
          id="service-form-input-body"
          v-model="serviceForm.body.$value"
          :state="validStateBody"
        />
        <b-form-invalid-feedback :state="validStateBody">
          <span v-for="(err, inx) in serviceForm.body.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="service-form__action">
        <div class="service-form__action--left">
          <b-button
            v-show="isDelete"
            variant="outline-danger"
            @click="confirmDelete = true"
          >
            削除する
          </b-button>
        </div>
        <div class="service-form__action--right">
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
      </div>
    </form>

    <template v-if="confirmDelete" #overlay>
      <div class="text-center">
        <b-icon
          icon="exclamation-circle"
          variant="danger"
          font-scale="3"
          animation="cylon"
        />
        <p class="my-3">本当に削除しますか？</p>
        <b-button variant="danger" @click="onDelete">削除する</b-button>
        <b-button variant="secondary" @click="confirmDelete = false">
          やめる
        </b-button>
      </div>
    </template>
  </contentsform-wrap>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  onMounted,
} from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/utils/form-validators'
import { EditProps, useEditControll } from '@/composable/use-edit-controll'
import { useServiceData } from '@/composable/use-service-data'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useImageCompression } from '@/composable/use-image-compression'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'ServiceForm',
  components: { ContentsformWrap, FileInput, WysiwsgEditor },
  props: {
    editProps: {
      type: Object as PropType<EditProps>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const contentId = props.editProps.id ?? 0
    const { isCreateAction, isUpdateAction, isDeleteAction } = useEditControll()

    const { customerId } = useCurrentCustomer()
    const { compressing, compress } = useImageCompression()
    const {
      service,
      loading,
      endLoading,
      loadService,
      createService,
      updateService,
      deleteService,
    } = useServiceData()

    const serviceForm = useValidation({
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
    const validStateTitle = computed(() =>
      !serviceForm.title.$dirty ? null : !serviceForm.title.$anyInvalid
    )
    const validStateImage = computed(() =>
      !serviceForm.image.$dirty ? null : !serviceForm.image.$anyInvalid
    )
    const validStateBody = computed(() =>
      !serviceForm.body.$dirty ? null : !serviceForm.body.$anyInvalid
    )

    onMounted(async () => {
      if (isCreate.value) {
        endLoading()
        return
      }
      await loadService(contentId)
      serviceForm.title.$value = service.title || ''
      serviceForm.image.$value = service.image.url
      serviceForm.body.$value = service.body || ''
    })

    const onChangeImageFile = async (imageFile: File) => {
      const { compressedImageFile, compressedImageUrl } = await compress(
        imageFile
      )
      serviceForm.imageFile.$value = compressedImageFile
      serviceForm.image.$value = compressedImageUrl
    }

    const onCreate = async () => {
      serviceForm.$touch()
      if (serviceForm.$anyInvalid) return

      const formData = serviceForm.toObject()
      const serviceData = {
        id: 0,
        customerId,
        title: formData.title,
        body: formData.body,
        image: service.image,
        position: service.position,
      }
      const imageFile = (formData.imageFile as File) || null
      await createService(serviceData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      serviceForm.$touch()
      if (serviceForm.$anyInvalid) return

      const formData = serviceForm.toObject()
      const serviceData = {
        id: contentId,
        customerId,
        title: formData.title,
        body: formData.body,
        image: service.image,
        position: service.position,
      }
      const imageFile = (formData.imageFile as File) || null
      await updateService(contentId, serviceData, imageFile)
      emit('close')
    }

    const confirmDelete = ref(false)
    const onDelete = async () => {
      await deleteService(contentId)
      confirmDelete.value = false
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    const isCreate = computed(() => isCreateAction(props.editProps.action))
    const isUpdate = computed(() => isUpdateAction(props.editProps.action))
    const isDelete = computed(() => isDeleteAction(props.editProps.action))

    return {
      serviceForm,
      validStateTitle,
      validStateImage,
      validStateBody,
      onChangeImageFile,
      onCreate,
      onUpdate,
      onDelete,
      onCancel,
      confirmDelete,
      loading,
      compressing,
      isCreate,
      isUpdate,
      isDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-form {
  &__input {
    margin-bottom: 1rem;
  }
  &__action {
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    &--left {
      text-align: left;
    }
    &--right {
      text-align: right;
    }
  }
}
</style>
