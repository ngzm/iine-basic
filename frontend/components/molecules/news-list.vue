<template>
  <ul class="news-list-wrapper">
    <li
      v-for="news in newsList"
      :key="news.id"
    >
      <p class="news-header">
        <span>{{ jstDateString(news.publishOn) }}</span>
        <news-category-badge :category="news.category" class="ml-2" />
      </p>
      <p class="news-title">
        <a href="">{{news.title}}</a>
      </p>
    </li>
  </ul> 
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { formatLocalDates } from '@/plugins/common-utils'
import { NewsListItem } from '~/types/news-type'
import NewsCategoryBadge from '@/components/molecules/news-category-badge.vue'

export default defineComponent({
  name: 'NewsList',
  components: { NewsCategoryBadge },
  props: {
    newsList: {
      type: Array as PropType<NewsListItem[]>,
      required: true
    }
  },
  setup() {
    const jstDateString = (pdate: Date) => formatLocalDates(pdate, 'YYYY/MM/DD')
    return { jstDateString }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

ul.news-list-wrapper {
  list-style: none;
  margin: 0;
  padding: 0; 
  li {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    p {
      margin: 2px;
      padding: 0.4rem; 
    }
    p.news-header {
      text-align: center;
      width: 14rem;
      min-width: 14rem;
      background-color: #ccccff;
    }
    p.news-title {
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  ul.news-list-wrapper {
    li {
      display: flex;
      flex-flow: column;
      align-items: stretch;
      p.news-title {
        margin: 0 0 0.6rem 0;
      }
    }
  }
}
</style>
