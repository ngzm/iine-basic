<template>
  <contents-card>
    <template #default>
      <section-eyecatcher :background-image="news.image" />

      <contents-card-body>
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

    <template #editActivator>
      <content-edit-activator type="NewsForm" :content-id="news.id" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import newsHandler from '@/composable/news-handler'
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
    newsId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const { news, loadNews } = newsHandler()

    // TODO: need sanitize!
    const newsBodyHtml = computed(() => {
      return news.body
    })

    onMounted(() => {
      loadNews(props.newsId)
    })

    return {
      sidebarIdName,
      news,
      newsBodyHtml
    }
  }
})
</script>

<style lang="scss" scoped>

.type1-news-detail {
  &__title {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
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
