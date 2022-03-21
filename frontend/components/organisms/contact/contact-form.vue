<template>
  <b-overlay :show="loading">
    <div class="contact-form"> 
      <div class="contact-form__input">
        <label for="contact-form-input-image">タイトル背景画像</label>
        <file-input
          id="contact-form-input-image"
          :image-url="contactForm.image.$value"
          :state="validStateImage"
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
        <b-button variant="success" @click="onUpdate">
          更新する
        </b-button>
        <b-button @click="onCancel">
          キャンセル
        </b-button>
      </div>
    </div>
  </b-overlay>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/composable/form-validators'
import { useContactData } from '~/composable/use-contact-data'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'ContactForm',
  components: { FileInput, WysiwsgEditor },
  props: {
    dataId: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const { contact, loading, loadContact, updateContact } = useContactData(1)
    const contactForm = useValidation({
      id: {
        $value: ref(0),
      },
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

    const validStateTitle = computed(() => !contactForm.title.$dirty ? null : !contactForm.title.$anyInvalid)
    const validStateSubtitle = computed(() => !contactForm.subtitle.$dirty ? null : !contactForm.subtitle.$anyInvalid)
    const validStateImage = computed(() => !contactForm.image.$dirty ? null : !contactForm.image.$anyInvalid)
    const validStateBody = computed(() => !contactForm.body.$dirty ? null : !contactForm.body.$anyInvalid)

    onMounted(async() => {
      await loadContact(props.dataId)
      contactForm.id.$value = contact.value.id || 0
      contactForm.title.$value = contact.value.title || ''
      contactForm.subtitle.$value = contact.value.subtitle || ''
      contactForm.image.$value = contact.value.image || ''
      contactForm.body.$value = contact.value.body || ''
    })

    const onChangeImageFile =(imageFile: File) => {
      contactForm.imageFile.$value = imageFile
      contactForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onUpdate = async () => {
      contactForm.$touch()
      if (contactForm.$anyInvalid) return

      const formData = contactForm.toObject()
      const contactData = {
        id: formData.id,
        title: formData.title,
        subtitle: formData.subtitle,
        image: formData.image,
        body: formData.body
      }
      const imageFile = formData.imageFile as File || null
      await updateContact(contactData, imageFile)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    return {
      contactForm,
      validStateTitle,
      validStateSubtitle,
      validStateImage,
      validStateBody,
      onChangeImageFile,
      onUpdate,
      onCancel,
      loading,
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
