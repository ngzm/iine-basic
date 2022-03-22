<template>
  <contentsform-wrap :overlay="loading || confirmDelete">
    <form class="news-form"> 
      <div class="news-form__input">
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
      </div>
      <div class="news-form__input">
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
      </div>
      <div class="news-form__input">
        <label for="news-form-input-category">ニュースカテゴリ</label>
        <b-form-select
          id="news-form-input-category"
          v-model="newsForm.category.$value"
          :options="categoryOptions"
          :state="validStateCategory"
        />
        <b-form-invalid-feedback :state="validStateCategory">
          <span v-for="(err, inx) in newsForm.category.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="news-form__input">
        <label for="news-form-input-publish-on">ニュース公開日</label>
        <b-form-datepicker
          id="news-form-input-publish-on"
          placeholder="公開日選択"
          :state="validStatePublishOn"
        />
        <b-form-invalid-feedback :state="validStatePublishOn">
          <span v-for="(err, inx) in newsForm.publishOn.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="news-form__input">
        <label for="news-form-input-body">本文</label>
        <wysiwsg-editor
          id="news-form-input-body"
          v-model="newsForm.body.$value"
          :state="validStateBody"
        />
        <b-form-invalid-feedback :state="validStateBody">
          <span v-for="(err, inx) in newsForm.body.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="news-form__action">
        <div class="news-form__action--left">
          <b-button v-show="action === 'moddel'" variant="outline-danger" @click="confirmDelete = true">
            削除する
          </b-button>
        </div>
        <div class="news-form__action--right">
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
import { useNewsData } from '@/composable/use-news-data'
import { contentActionTypes, ContentActionType } from '@/composable/content-helper'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'NewsForm',
  components: { ContentsformWrap, FileInput, WysiwsgEditor },
  props: {
    action: {
      type: String as PropType<ContentActionType>,
      required: true
    },
    dataId: {
      type: Number,
      default: 0
    },
  },
  setup(props, { emit }) {
    const { action, dataId } = props

    const { news, loadNews, createNews, updateNews, deleteNews, loading } = useNewsData(1)
    const newsForm = useValidation({
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

    const categoryOptions = [
      { value: null, text: 'カテゴリを選択', disabled: true },
      { value: 'I', text: 'INFO' },
      { value: 'S', text: 'SERVICE' },
      { value: 'W', text: 'WORK' },
      { value: 'T', text: 'TECH' },
    ]

    onMounted(async() => {
      if (action === contentActionTypes.create) return

      await loadNews(dataId)
      newsForm.id.$value = news.value.id || 0
      newsForm.title.$value = news.value.title || ''
      newsForm.category.$value = news.value.category || ''
      newsForm.publishOn.$value = news.value.publishOn || new Date() 
      newsForm.image.$value = news.value.image || ''
      newsForm.body.$value = news.value.body || ''
    })

    const onChangeImageFile =(imageFile: File) => {
      newsForm.imageFile.$value = imageFile
      newsForm.image.$value = URL.createObjectURL(imageFile)
    }

    const onCreate = async () => {
      newsForm.$touch()
      if (newsForm.$anyInvalid) return

      const formData = newsForm.toObject()
      const newsData = {
        id: 0,
        title: formData.title,
        category: formData.category,
        publishOn: formData.publishOn as Date,
        image: formData.image,
        body: formData.body
      }
      const imageFile = formData.imageFile as File || null
      await createNews(newsData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      newsForm.$touch()
      if (newsForm.$anyInvalid) return

      const formData = newsForm.toObject()
      const newsData = {
        id: formData.id,
        title: formData.title,
        category: formData.category,
        publishOn: formData.publishOn as Date,
        image: formData.image,
        body: formData.body
      }
      const imageFile = formData.imageFile as File || null
      await updateNews(newsData, imageFile)
      emit('close')
    }

    const confirmDelete = ref(false)
    const onDelete = async () => {
      await deleteNews(dataId)
      confirmDelete.value = false
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
      onCreate,
      onUpdate,
      onDelete,
      onCancel,
      categoryOptions,
      loading,
      confirmDelete
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
