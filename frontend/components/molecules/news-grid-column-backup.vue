<template>
  <div
    class="grid-box"
    @mouseover="mouseOverAction()"
    @mouseleave="mouseLeaveAction()"
  >
    <div
      v-show="!isHover"
      class="news-image"
      :style="`background-image: url(${news.image})`"
    />
    <div 
      v-show="isHover"
      class="news-information"
    >
      <h5 class="news-title">{{ news.title }}</h5>
      <p class="feature-comment">{{ news.publishOn }}</p>
      <p class="feature-comment">{{ news.category }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from '@vue/composition-api'
import { NewsType } from '@/types/news-type'

export default defineComponent({
  name: 'NewsGridColumn',
  props: {
    news: {
      type: Object as PropType<NewsType>,
      required: true
    }
  },
  setup(prop) {
    const isHover = ref(false)

    const mouseOverAction = () => {
      isHover.value = true;
      console.log('over', prop.news.id)
      console.log('isHovers', isHover)
    }
    const mouseLeaveAction = () => {
      isHover.value = false;
      console.log('over', prop.news.id)
      console.log('isHovers', isHover)
    }

    const isMouseOver = computed(() => isHover.value)

    return {
      isHover,
      mouseOverAction,
      mouseLeaveAction,
      isMouseOver
    }
  }
})
</script>

<style lang="scss" scoped>
.grid-box {
  background-color: mediumblue;
  margin: 1rem;
  padding: 0;
  width: 16rem;
  overflow:hidden;
  .news-image {
    overflow:hidden;
    background-position: center center;
    background-size: cover;
    height: 12rem;
    width: 16rem;
    margin: 0;
    padding: 0;
  }
  .news-information{
    overflow:hidden;
    color: white;
    background-color: black;
    height: 12rem;
    width: 16rem;
    margin: 0;
    padding: 1em;
    text-align: left;
    h4,h5.news-title {
      font-weight: bold;
      font-size: 1rem;
      margin: 0;
      padding: 0;
    }
    .feature-comment {
      margin: 0.8rem 0 0 0;
      padding: 0;
    }
  }
}
</style>
