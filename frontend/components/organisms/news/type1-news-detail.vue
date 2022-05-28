<template>
  <contents-card :overlay="loading || notFound">
    <template #default>
      <section-eyecatcher
        v-if="newsImage.url && newsImage.url.length"
        :image="newsImage"
      >
        <template #actions>
          <image-setter
            :image-setting="newsImage"
            @change="onChangeImageSetting"
          />
        </template>
      </section-eyecatcher>

      <contents-card-body>
        <p class="type1-news-detail__publish">
          <small>{{ jstDateString }}</small>
        </p>
        <h5 class="g-text-cl type1-news-detail__title">
          <span>{{ news.title }}</span>
        </h5>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="newsBodyHtml" />

        <div class="type1-news-detail__action">
          <slot name="action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              <b-icon icon="envelope" />
              お問い合せ
            </b-button>
          </slot>
        </div>
      </contents-card-body>
    </template>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator :edit-props="editProps" />
    </template>
    <template v-if="notFound" #overlay>
      <content-notfound :type="editProps.type" />
    </template>
  </contents-card>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  computed,
} from '@nuxtjs/composition-api'

import { formatLocalDate, sanitizer } from '@/utils/common-utils'
import { editTypes, editActions } from '@/composable/use-edit-controll'
import { useNewsData } from '@/composable/use-news-data'
import { sidebarIdName } from '@/components/organisms/inquire/inquire-form-sidebar.vue'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ImageSetter from '@/components/molecules/edit/image-setter.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'
import ContentNotfound from '~/components/molecules/edit/content-notfound.vue'

export default defineComponent({
  name: 'Type1NewsDetail',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ImageSetter,
    ContentEditActivator,
    ContentNotfound,
  },
  props: {
    contentId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const {
      news,
      newsImage,
      loading,
      notFound,
      loadNews,
      getRecentData,
      changeImageSetting,
    } = useNewsData()

    const editProps = reactive({
      type: editTypes.news,
      action: editActions.update,
      id: props.contentId,
    })

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
        editProps.id = currentId
        await loadNews(currentId)
      }
    })

    const jstDateString = computed(() =>
      formatLocalDate(news.publishOn as Date, 'YYYY/MM/DD')
    )
    const newsBodyHtml = computed(() => sanitizer(news.body))

    const onChangeImageSetting = (value: { [key: string]: string }) => {
      Object.assign(newsImage, value)
      changeImageSetting(news.id, newsImage)
    }

    return {
      sidebarIdName,
      news,
      newsImage,
      newsBodyHtml,
      onChangeImageSetting,
      jstDateString,
      loading,
      notFound,
      editProps,
    }
  },
})
</script>

<style lang="scss" scoped>
.type1-news-detail {
  &__publish {
    position: relative;
    top: -1rem;
    text-align: right;
  }
  &__title {
    margin-bottom: 1.5rem;
    span {
      font-weight: bold;
    }
  }
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
}
</style>
