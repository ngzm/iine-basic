<template>
  <div class="service-form"> 
    <p class="service-form__input">
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
    </p>
    <p class="service-form__input">
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
    </p>
    <p class="service-form__input">
      <label for="service-form-input-body">本文</label>
      <b-form-textarea
        id="service-form-input-body"
        v-model="serviceForm.body.$value"
        rows="6"
        max-rows="18"
        :state="validStateBody"
      />
      <b-form-invalid-feedback :state="validStateBody">
        <span v-for="(err, inx) in serviceForm.body.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="service-form__action">
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
import { useServiceData } from '~/composable/use-service-data'
import FileInput from '@/components/atoms/file-input.vue'

export default defineComponent({
  name: 'ServiceForm',
  components: { FileInput },
  props: {
    dataId: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const { service, loading, loadService, updateService } = useServiceData(1)
    const serviceForm = useValidation({
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
      await loadService(props.dataId)
      serviceForm.id.$value = service.value.id || 0
      serviceForm.title.$value = service.value.title || ''
      serviceForm.image.$value = service.value.image || ''
      serviceForm.body.$value = service.value.body || ''
    })

    const onChangeImageFile =(imageFile: File) => {
      serviceForm.imageFile.$value = imageFile
      serviceForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onUpdate = async () => {
      serviceForm.$touch()
      if (serviceForm.$anyInvalid) return

      const formData = serviceForm.toObject()
      const serviceData = {
        id: formData.id,
        title: formData.title,
        image: formData.image,
        body: formData.body
      }
      const imageFile = formData.imageFile as File || null
      await updateService(serviceData, imageFile)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    return {
      loading,
      serviceForm,
      validStateTitle,
      validStateImage,
      validStateBody,
      onChangeImageFile,
      onUpdate,
      onCancel,
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
    text-align: right;
  }
}
</style>
