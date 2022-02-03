<template>
  <contents-card>
    <template #default>
      <news-list :newses="newses" />
      <div class="home-news-nav">
        <b-link to="/news">and more ...</b-link>
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@vue/composition-api'
import { NewsType } from '@/types/content-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import NewsList from '@/components/molecules/news-list.vue'

export default defineComponent({
  name: 'Type1Newses',
  components: { ContentsCard, NewsList },
  props: {
    newses: {
      type: Array as PropType<NewsType[]>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
.home-news-nav {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
