<template>
  <section>
    <h4 class="section-title">
      <span>{{ title }}</span>
    </h4>
    <contents-card>
      <template #default>
        <news-list :newses="newses" />
        <div class="home-news-nav">
          <b-link to="/news">and more ...</b-link>
        </div>
      </template>
    </contents-card>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { NewsType } from '@/types/content-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import NewsList from '@/components/molecules/news-list.vue'

export default defineComponent({
  name: 'LongLivenetHomeNewses',
  components: { ContentsCard, NewsList },
  props: {
    newses: {
      type: Array as PropType<NewsType[]>,
      required: true
    }
  },
  setup() {
    const title = computed(() => 'What\'s new')

    return {
      title,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.section-title {
  @include index-section-title;
}

.home-news-nav {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
