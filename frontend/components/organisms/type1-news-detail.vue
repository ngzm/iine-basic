<template>
  <contents-card>
    <template #header>
      <section-eye-catcher :background-image="news.image" />
    </template>
    <template #default>
      <h5 class="type1-news-detail__title"><span>{{ news.title }}</span></h5>
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
    </template>

    <template #editActivator>
      <content-edit-activator type="news" :content-id="news.id" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import newsHandler from '@/composable/news-handler'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '@/components/molecules/section-eye-catcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Iformations',
  components: {
    ContentsCard,
    SectionEyeCatcher,
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
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
