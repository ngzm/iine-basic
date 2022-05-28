<template>
  <contentsform-wrap :overlay="loading || confirmDelete">
    <form class="news-form">
      <div class="news-form__input">
        <label for="news-form-input-image">タイトル背景画像</label>
        <file-input
          id="news-form-input-image"
          :image-url="newsForm.image.$value"
          :state="validStateImage"
          :buzy="compressing"
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
      <div class="news-form__wrap">
        <div class="news-form__wrap__input">
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
        <div class="news-form__wrap__input">
          <label for="news-form-input-publish-on">ニュース公開日</label>
          <b-form-datepicker
            id="news-form-input-publish-on"
            v-model="newsForm.publishOn.$value"
            placeholder="公開日選択"
            :state="validStatePublishOn"
          />
          <b-form-invalid-feedback :state="validStatePublishOn">
            <span v-for="(err, inx) in newsForm.publishOn.$errors" :key="inx">
              {{ err }}<br />
            </span>
          </b-form-invalid-feedback>
        </div>
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
          <b-button
            v-show="isDelete"
            variant="outline-danger"
            @click="confirmDelete = true"
          >
            削除する
          </b-button>
        </div>
        <div class="news-form__action--right">
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
import { formatLocalDate, localDate } from '@/utils/common-utils'
import { required, maximunLength } from '@/utils/form-validators'
import { EditProps, useEditControll } from '@/composable/use-edit-controll'
import { useNewsData } from '@/composable/use-news-data'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useImageCompression } from '@/composable/use-image-compression'
import ContentsformWrap from '@/components/molecules/contentsform-wrap.vue'
import FileInput from '@/components/atoms/file-input.vue'
import WysiwsgEditor from '@/components/atoms/wysiwsg-editor.vue'

export default defineComponent({
  name: 'NewsForm',
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
      news,
      loading,
      endLoading,
      loadNews,
      createNews,
      updateNews,
      deleteNews,
    } = useNewsData()

    const newsForm = useValidation({
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
        $value: ref(''),
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
      !newsForm.title.$dirty ? null : !newsForm.title.$anyInvalid
    )
    const validStateCategory = computed(() =>
      !newsForm.category.$dirty ? null : !newsForm.category.$anyInvalid
    )
    const validStatePublishOn = computed(() =>
      !newsForm.publishOn.$dirty ? null : !newsForm.publishOn.$anyInvalid
    )
    const validStateImage = computed(() =>
      !newsForm.image.$dirty ? null : !newsForm.image.$anyInvalid
    )
    const validStateBody = computed(() =>
      !newsForm.body.$dirty ? null : !newsForm.body.$anyInvalid
    )

    const categoryOptions = [
      { value: null, text: 'カテゴリを選択', disabled: true },
      { value: 'I', text: 'INFO' },
      { value: 'S', text: 'SERVICE' },
      { value: 'W', text: 'WORK' },
      { value: 'T', text: 'TECH' },
    ]

    onMounted(async () => {
      if (isCreate.value) {
        endLoading()
        return
      }
      await loadNews(contentId)
      newsForm.title.$value = news.title
      newsForm.category.$value = news.category
      newsForm.publishOn.$value = formatLocalDate(
        news.publishOn as Date,
        'YYYY-MM-DD'
      )
      newsForm.image.$value = news.image?.url || ''
      newsForm.body.$value = news.body
    })

    const onChangeImageFile = async (imageFile: File) => {
      const { compressedImageFile, compressedImageUrl } = await compress(
        imageFile
      )
      newsForm.imageFile.$value = compressedImageFile
      newsForm.image.$value = compressedImageUrl
    }

    const onCreate = async () => {
      newsForm.$touch()
      if (newsForm.$anyInvalid) return

      const formData = newsForm.toObject()
      const newsData = {
        id: 0,
        customerId,
        title: formData.title,
        category: formData.category,
        publishOn: localDate(formData.publishOn),
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await createNews(newsData, imageFile)
      emit('close')
    }

    const onUpdate = async () => {
      newsForm.$touch()
      if (newsForm.$anyInvalid) return

      const formData = newsForm.toObject()
      const newsData = {
        id: contentId,
        customerId,
        title: formData.title,
        category: formData.category,
        publishOn: localDate(formData.publishOn),
        body: formData.body,
      }
      const imageFile = (formData.imageFile as File) || null
      await updateNews(contentId, newsData, imageFile)
      emit('close')
    }

    const confirmDelete = ref(false)
    const onDelete = async () => {
      await deleteNews(contentId)
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
.news-form {
  &__input {
    margin-bottom: 1rem;
  }
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    &__input {
      margin-bottom: 1rem;
      margin-right: 1rem;
    }
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
