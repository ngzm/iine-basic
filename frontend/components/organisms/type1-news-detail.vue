<template>
  <contents-card>
    <template #header>
      <section-eye-catcher :background-image="eyeCatcherImage">
        {{ eyeCatcherTitle }}
      </section-eye-catcher>
    </template>
    <template #default>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="bodyHtml" />
      <div v-if="$slots.nav" class="news-detail-nav">
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
    const eyeCatcherImage = computed(() => props.news.image)
    const eyeCatcherTitle = computed(() => props.news.title)

    // TODO: need sanitize!
    const bodyHtml = computed(() => {
      console.log(props.news)
      return props.news.body
    })

    return {
      eyeCatcherImage,
      eyeCatcherTitle,
      bodyHtml
    }
  }
})
</script>

<style lang="scss" scoped>
.news-detail-nav {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
