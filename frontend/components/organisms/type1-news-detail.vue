<template>
  <contents-card>
    <template #header>
      <section-eye-catcher :background-image="newsImage" />
    </template>
    <template #default>
      <h5 class="news-detail__title"><span>{{ newsTitle }}</span></h5>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="newsBodyHtml" />
      <div v-if="$slots.nav" class="news-detail__nav">
        <slot name="nav" />
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'
import { NewsType } from '@/types/content-type'

export default defineComponent({
  name: 'Type1Iformations',
  components: { ContentsCard, SectionEyeCatcher },
  props: {
    news: {
      type: Object as PropType<NewsType>,
      required: true
    }
  },
  setup(props) {
    const newsImage = computed(() => props.news.image)
    const newsTitle = computed(() => props.news.title)

    // TODO: need sanitize!
    const newsBodyHtml = computed(() => {
      return props.news.body
    })

    return {
      newsImage,
      newsTitle,
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
