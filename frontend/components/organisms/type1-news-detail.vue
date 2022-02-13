<template>
  <contents-card>
    <template #header>
      <section-eye-catcher :background-image="news.image" />
    </template>
    <template #default>
      <h5 class="news-detail__title"><span>{{ news.title }}</span></h5>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="newsBodyHtml" />
      <div v-if="$slots.nav" class="news-detail__nav">
        <slot name="nav" />
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'
import newsHandler from '@/composable/news-handler'

export default defineComponent({
  name: 'Type1Iformations',
  components: { ContentsCard, SectionEyeCatcher },
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
      news,
      newsBodyHtml
    }
  }
})
</script>

<style lang="scss" scoped>

.news-detail {
  &__title {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
    span {
      // background: linear-gradient(transparent 75%, orange 75%);
      font-weight: bold;
    }
  }
  &__nav {
    margin-top: 1.5rem;
  }
}

</style>
