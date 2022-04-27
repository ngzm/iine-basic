<template>
  <ul class="news-list-wrapper">
    <li
      v-for="news in newses"
      :key="news.id"
    >
      <div class="edit-activator">
        <slot name="editActivator" :news="news" />
      </div>
      <div class="news-header">
        <span>{{ jstDateString(news.publishOn) }}</span>
        <news-category-badge :category="news.category" class="ml-2" />
      </div>
      <div class="news-title">
        <a href="" @click.prevent.stop="$router.push(`/news/${news.id}`)">{{news.title}}</a>
      </div>
    </li>
  </ul> 
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
import { formatLocalDate } from '@/utils/common-utils'
import NewsCategoryBadge from '@/components/molecules/news-category-badge.vue'


export default defineComponent({
  name: 'NewsList',
  components: {
    NewsCategoryBadge,
  },
  props: {
    newses: {
      type: Array as PropType<NewsType[]>,
      required: true
    }
  },
  setup() {
    const jstDateString = (pdate: Date) => formatLocalDate(pdate, 'YYYY/MM/DD')
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
    div {
      margin: 2px;
      padding: 0.4rem; 
    }
    div.edit-activator{
      margin: 0;
      padding: 0;
    }
    div.news-header {
      text-align: center;
      width: 14rem;
      min-width: 14rem;
      background-color: #ccccff;
    }
    div.news-title {
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
