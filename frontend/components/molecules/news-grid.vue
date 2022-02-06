<template>
  <b-container>
    <b-row
      cols="1"
      cols-sm="1"
      cols-md="2"
      cols-lg="2"
      cols-xl="3"
    >
      <template v-for="news in newses">
        <news-grid-column
          :key="news.id"
          :news="news"
        />
      </template>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
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
</style>
