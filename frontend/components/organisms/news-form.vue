<template>
  <div class="news-form"> 
    <p class="news-form__input">
      <label for="news-form-input-image">タイトル背景画像</label>
      <file-input
        id="news-form-input-image"
        :image-url="newsForm.image.$value"
        :state="validStateImage"
        @change-image-file="onChangeImageFile"
      />
      <b-form-invalid-feedback :state="validStateImage">
        <span v-for="(err, inx) in newsForm.image.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="news-form__input">
      <label for="news-form-input-title">タイトル</label>
      <b-form-input
        id="news-form-input-title"
        v-model="newsForm.title.$value"
        :state="validStateTitle"
      />
      <b-form-invalid-feedback :state="validStateTitle">
        <span v-for="(err, inx) in newsForm.title.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="news-form__input">
      <label for="news-form-input-category">ニュースカテゴリ</label>
      <b-form-input
        id="news-form-input-category"
        v-model="newsForm.category.$value"
        :state="validStateCategory"
      />
      <b-form-invalid-feedback :state="validStateCategory">
        <span v-for="(err, inx) in newsForm.category.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="news-form__input">
      <label for="news-form-input-publish-on">ニュース公開日</label>
      <b-form-input
        id="news-form-input-publish-on"
        v-model="newsForm.publishOn.$value"
        :state="validStatePublishOn"
      />
      <b-form-invalid-feedback :state="validStatePublishOn">
        <span v-for="(err, inx) in newsForm.publishOn.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="news-form__input">
      <label for="news-form-input-body">本文</label>
      <b-form-textarea
        id="news-form-input-body"
        v-model="newsForm.body.$value"
        rows="6"
        max-rows="18"
        :state="validStateBody"
      />
      <b-form-invalid-feedback :state="validStateBody">
        <span v-for="(err, inx) in newsForm.body.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p class="news-form__action">
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
import { NewsFormType } from '~/types/content-type'
import newsHandler from '@/composable/news-handler'
import FileInput from '@/components/atoms/file-input.vue'

export default defineComponent({
  name: 'NewsForm',
  components: { FileInput },
  props: {
    dataId: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const { loadNews, getNews, updateNews } = newsHandler()
    const newsId = props.dataId;

    const newsForm = useValidation({
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
      category: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('カテゴリを入力してください'),
        },
      },
      publishOn: {
        $value: ref(new Date()),
        required: {
          $validator: required,
          $message: ref('公開日を入力してください'),
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

    const validStateTitle = computed(() => !newsForm.title.$dirty ? null : !newsForm.title.$anyInvalid)
    const validStateCategory = computed(() => !newsForm.category.$dirty ? null : !newsForm.category.$anyInvalid)
    const validStatePublishOn = computed(() => !newsForm.publishOn.$dirty ? null : !newsForm.publishOn.$anyInvalid)
    const validStateImage = computed(() => !newsForm.image.$dirty ? null : !newsForm.image.$anyInvalid)
    const validStateBody = computed(() => !newsForm.body.$dirty ? null : !newsForm.body.$anyInvalid)

    onMounted(async () => {
      await loadNews(newsId)
      const news = getNews()
      newsForm.id.$value = news.id || 0
      newsForm.title.$value = news.title || ''
      newsForm.category.$value = news.category || ''
      newsForm.publishOn.$value = news.publishOn || new Date() 
      newsForm.image.$value = news.image || ''
      newsForm.body.$value = news.body || ''
    })

    const onChangeImageFile =(imageFile: File) => {
      newsForm.imageFile.$value = imageFile
      newsForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onUpdate = () => {
      newsForm.$touch()
      if (newsForm.$anyInvalid) return

      const formData = newsForm.toObject()
      const updateData: NewsFormType = {
        id: formData.id,
        title: formData.title,
        category: formData.category,
        publishOn: formData.publishOn as Date,
        image: formData.image,
        imageFile: formData.imageFile,
        body: formData.body
      }
      updateNews(updateData)
      emit('close')
    }

    const onCancel = () => {
      emit('close')
    }

    return {
      newsForm,
      validStateTitle,
      validStateCategory,
      validStatePublishOn,
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
.news-form {
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
