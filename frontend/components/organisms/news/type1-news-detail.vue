<template>
  <contents-card :overlay="loading || notFound">
    <template #default>
      <section-eyecatcher :background-image="news.image || ''" />

      <contents-card-body>
        <p class="type1-news-detail__publish">
          <small>{{ jstDateString }}</small>
        </p>
        <h5 class="type1-news-detail__title">
          <span>{{ news.title }}</span>
        </h5>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="newsBodyHtml" />

        <div class="type1-news-detail__action">
          <slot name="action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              <b-icon icon="hand-index" />
              お問い合せ
            </b-button>
          </slot>
        </div>
      </contents-card-body>
    </template>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator
        :type="types.news"
        :action="actions.moddel"
        :content-id="contentId"
      />
    </template>
    <template v-if="notFound" #overlay>
      <div class="text-center">
        <p class="my-3">大変申し訳ございません</p>
        <p class="my-3">情報が見つかりませんでした</p>
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import { formatLocalDate, sanitizer } from '@/utils/common-utils'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import { contentDataTypes, contentActionTypes } from '@/composable/content-helper'
import { useNewsData } from '@/composable/use-news-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1NewsDetail',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ContentEditActivator
  },
  props: {
    contentId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const {
      news,
      loading,
      notFound,
      loadNews
    } = useNewsData()

    onMounted(async () => {
      await loadNews(props.contentId)
    })

    const jstDateString = computed(() => formatLocalDate(news.publishOn as Date, 'YYYY/MM/DD'))
    const newsBodyHtml = computed(() => sanitizer(news.body))

    return {
      sidebarIdName,
      news,
      newsBodyHtml,
      jstDateString,
      loading,
      notFound,
      types: contentDataTypes,
      actions: contentActionTypes,
    }
  }
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
    text-align: center;
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
