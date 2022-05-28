<template>
  <contentsform-wrap :overlay="loading">
    <form class="contact-form">
      <div class="contact-form__input">
        <label for="contact-form-input-image">タイトル背景画像</label>
        <file-input
          id="contact-form-input-image"
          :image-url="contactForm.image.$value"
          :state="validStateImage"
          :buzy="compressing"
          @change-image-file="onChangeImageFile"
        />
        <b-form-invalid-feedback :state="validStateImage">
          <span v-for="(err, inx) in contactForm.image.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="contact-form__input">
        <label for="contact-form-input-title">タイトル</label>
        <b-form-input
          id="contact-form-input-title"
          v-model="contactForm.title.$value"
          :state="validStateTitle"
        />
        <b-form-invalid-feedback :state="validStateTitle">
          <span v-for="(err, inx) in contactForm.title.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="contact-form__input">
        <label for="contact-form-input-subtitle">サブタイトル</label>
        <b-form-input
          id="contact-form-input-subtitle"
          v-model="contactForm.subtitle.$value"
          :state="validStateSubtitle"
        />
        <b-form-invalid-feedback :state="validStateSubtitle">
          <span v-for="(err, inx) in contactForm.subtitle.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="contact-form__input">
        <label for="contact-form-input-body">本文</label>
        <wysiwsg-editor
          id="contact-form-input-body"
          v-model="contactForm.body.$value"
          :state="validStateBody"
        />
        <b-form-invalid-feedback :state="validStateBody">
          <span v-for="(err, inx) in contactForm.body.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="contact-form__action">
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
} from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/utils/form-validators'
import { EditProps, useEditControll } from '@/composable/use-edit-controll'
import { useContactData } from '@/composable/use-contact-data'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useImageCompression } from '@/composable/use-image-compression'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'ContactForm',
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
      contact,
      loading,
      loadContact,
      createContact,
      updateContact,
      endLoading,
    } = useContactData()

    const contactForm = useValidation({
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
        required: {
          $validator: required,
          $message: ref('サブタイトルを入力してください'),
        },
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

    const validStateTitle = computed(() =>
      !contactForm.title.$dirty ? null : !contactForm.title.$anyInvalid
    )
    const validStateSubtitle = computed(() =>
      !contactForm.subtitle.$dirty ? null : !contactForm.subtitle.$anyInvalid
    )
    const validStateImage = computed(() =>
      !contactForm.image.$dirty ? null : !contactForm.image.$anyInvalid
    )
    const validStateBody = computed(() =>
      !contactForm.body.$dirty ? null : !contactForm.body.$anyInvalid
    )

    onMounted(async () => {
      if (isCreate.value) {
        endLoading()
        return
      }
      await loadContact(contentId)
      contactForm.title.$value = contact.title || ''
      contactForm.subtitle.$value = contact.subtitle || ''
      contactForm.image.$value = contact.image?.url || ''
      contactForm.body.$value = contact.body || ''
    })

    const onChangeImageFile = async (imageFile: File) => {
      const { compressedImageFile, compressedImageUrl } = await compress(
        imageFile
      )
      contactForm.imageFile.$value = compressedImageFile
      contactForm.image.$value = compressedImageUrl
    }

    const onCreate = async () => {
      contactForm.$touch()
      if (contactForm.$anyInvalid) return

      const formData = contactForm.toObject()
      const contactData = {
        id: 0,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await createContact(contactData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      contactForm.$touch()
      if (contactForm.$anyInvalid) return

      const formData = contactForm.toObject()
      const contactData = {
        id: contentId,
        customerId,
        title: formData.title,
        subtitle: formData.subtitle,
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await updateContact(contentId, contactData, imageFile)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    const isCreate = computed(() => isCreateAction(props.editProps.action))
    const isUpdate = computed(() => isUpdateAction(props.editProps.action))

    return {
      contactForm,
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
.contact-form {
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
