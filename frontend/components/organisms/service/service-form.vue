<template>
  <contentsform-wrap :overlay="loading || confirmDelete">
    <form class="service-form"> 
      <div class="service-form__input">
        <label for="service-form-input-image">タイトル背景画像</label>
        <file-input
          id="service-form-input-image"
          :image-url="serviceForm.image.$value"
          :state="validStateImage"
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
          <b-button v-show="action === 'moddel'" variant="outline-danger" @click="confirmDelete = true">
            削除する
          </b-button>
        </div>
        <div class="service-form__action--right">
          <b-button v-show="action === 'create'" variant="info" @click="onCreate">
            作成する
          </b-button>
          <b-button v-show="action === 'update' || action === 'moddel'" variant="success" @click="onUpdate">
            更新する
          </b-button>
          <b-button @click="onCancel">
            キャンセル
          </b-button>
        </div>
      </div>
    </form>

    <template v-if="confirmDelete" #overlay>
      <div class="text-center">
        <b-icon icon="exclamation-circle" variant="danger" font-scale="3" animation="cylon" />
        <p class="my-3">本当に削除しますか？</p>
        <b-button variant="danger" @click="onDelete">
          削除する
        </b-button>
        <b-button variant="secondary" @click="confirmDelete = false">
          やめる
        </b-button>
      </div>
    </template>
  </contentsform-wrap>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/composable/form-validators'
import { useServiceData } from '~/composable/use-service-data'
import { contentActionTypes, ContentActionType } from '@/composable/content-helper'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'ServiceForm',
  components: { ContentsformWrap, FileInput, WysiwsgEditor },
  props: {
    action: {
      type: String as PropType<ContentActionType>,
      required: true
    },
    dataId: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const { action, dataId } = props
    const userId = 1
    const {
      service,
      loading,
      loadService,
      createService,
      updateService,
      deleteService
    } = useServiceData(userId)
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
    const validStateTitle = computed(() => !serviceForm.title.$dirty ? null : !serviceForm.title.$anyInvalid)
    const validStateImage = computed(() => !serviceForm.image.$dirty ? null : !serviceForm.image.$anyInvalid)
    const validStateBody = computed(() => !serviceForm.body.$dirty ? null : !serviceForm.body.$anyInvalid)

    onMounted(async() => {
      if (action === contentActionTypes.create) return

      await loadService(dataId)
      serviceForm.title.$value = service.title || ''
      serviceForm.image.$value = service.image || ''
      serviceForm.body.$value = service.body || ''
    })

    const onChangeImageFile =(imageFile: File) => {
      serviceForm.imageFile.$value = imageFile
      serviceForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onCreate = async () => {
      serviceForm.$touch()
      if (serviceForm.$anyInvalid) return

      const formData = serviceForm.toObject()
      const serviceData = {
        id: 0,
        userId,
        title: formData.title,
        image: formData.image,
        body: formData.body,
        position: 0
      }
      const imageFile = formData.imageFile as File || null
      await createService(serviceData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      serviceForm.$touch()
      if (serviceForm.$anyInvalid) return

      const formData = serviceForm.toObject()
      const serviceData = {
        id: dataId,
        userId,
        title: formData.title,
        image: formData.image,
        body: formData.body,
        position: service.position
      }
      const imageFile = formData.imageFile as File || null
      await updateService(dataId, serviceData, imageFile)
      emit('close')
    }

    const confirmDelete = ref(false)
    const onDelete = async () => {
      await deleteService(dataId)
      confirmDelete.value = false
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

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
      loading,
      confirmDelete
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
