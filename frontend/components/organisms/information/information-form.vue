<template>
  <contentsform-wrap :overlay="loading">
    <form class="information-form">
      <div class="information-form__input">
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
        <b-button v-show="action === 'create'" variant="info" @click="onCreate">
          作成する
        </b-button>
        <b-button
          v-show="action === 'update' || action === 'moddel'"
          variant="success"
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
import { required, maximunLength } from '@/composable/form-validators'
import { InformationType } from '@/types/content-type'
import { useInformationData } from '@/composable/use-information-data'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import {
  contentActionTypes,
  ContentActionType,
} from '@/composable/content-helper'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'InformationForm',
  components: { ContentsformWrap, FileInput, WysiwsgEditor },
  props: {
    action: {
      type: String as PropType<ContentActionType>,
      required: true,
    },
    dataId: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const { action, dataId } = props
    const { customerId } = useCurrentCustomer()
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
      if (action === contentActionTypes.create) {
        endLoading()
        return
      }
      await loadInformation(dataId)
      informationForm.title.$value = information.title || ''
      informationForm.subtitle.$value = information.subtitle || ''
      informationForm.image.$value = information.image || ''
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

    const onChangeImageFile = (imageFile: File) => {
      informationForm.imageFile.$value = imageFile
      informationForm.image.$value = URL.createObjectURL(imageFile)
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
        image: formData.image,
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
        id: dataId,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        image: formData.image,
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await updateInformation(dataId, infomationData, imageFile)
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
      onCreate,
      onUpdate,
      onCancel,
      loading,
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
