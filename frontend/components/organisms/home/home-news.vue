<template>
  <section id="home-news-section">
    <section-title>What's New</section-title>
    <contents-card>
      <template #default>
        <news-list :news-list="newsList" />
        <div class="home-news-nav">
          <b-link href="/news">and more ...</b-link>
        </div>
      </template>
    </contents-card>
  </section>
</template>

<script lang='ts'>
import { defineComponent, computed } from '@vue/composition-api'
import { NewsListItem } from '~/types/news-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionTitle from '@/components/molecules/section-title.vue'
import NewsList from '@/components/molecules/news-list.vue'

export default defineComponent({
  name: 'HomeNews',
  components: {
    ContentsCard,
    SectionTitle,
    NewsList
  },
  setup() {
    const newsList = computed((): NewsListItem[] => {
      return [
        { id: 1, category: 'I', title: '当事業所のホームページを作成いたしました', publishOn: new Date('2020-02-23 10:00:00') },
        { id: 2, category: 'S', title: '初仕事で開発したサイトがリリースされました', publishOn: new Date('2020-04-10 01:00:00') },
        { id: 3, category: 'W', title: '開発したWebサイトがリリースされました', publishOn: new Date('2020-10-05 00:00:00') },
        { id: 4, category: 'T', title: 'おかげさまで一周年です！', publishOn: new Date('2020-02-27 00:00:00') },
        { id: 5, category: 'N', title: 'テストテストこれはテスト、少し長い文字列ですが', publishOn: new Date('2020-02-25 00:00:00') },
      ]
    })
    return { newsList }
  }
})
</script>

<style lang="scss" scoped>
.home-news-nav {
  text-align: center;
  margin-top: 1.5em;
}
</style>
