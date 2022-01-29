<template>
  <div class="news-grid-container-wrap">
    <div class="news-grid-container">
      <template v-for="news in newses">
        <news-grid-column
          :key="news.id"
          :news="news"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { NewsType } from '@/types/news-type'
import NewsGridColumn from '@/components/molecules/news-grid-column.vue'

export default defineComponent({
  name: 'NewsGrid',
  components: { NewsGridColumn },
  props: {
    newses: {
      type: Array as PropType<NewsType[]>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
.news-grid-container-wrap {
  display: flex;
  justify-content: center;
  background-color: burlywood;
  .news-grid-container {
    // background-color: blue;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-start;
    justify-content: center;
    margin: 0;
    padding: 0 1rem;
  }
  .news-grid-container::after {
  content: "";
  flex: auto;
}
}
</style>
