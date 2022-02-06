<template>
  <b-col
    class="grid-box"
    @mouseover="mouseOverAction()"
    @mouseleave="mouseLeaveAction()"
  >
    <div
      v-show="!isHover"
      class="news-image"
      :style="`background-image: url(${news.image})`"
    >
      <h5 class="news-title">{{ news.title }}</h5>
    </div>
    <div 
      v-show="isHover"
      class="news-information"
    >
      <h5 class="news-title">{{ news.title }}</h5>
      <p class="feature-comment">{{ news.publishOn }}</p>
      <p class="feature-comment">{{ news.category }}</p>
    </div>
  </b-col>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'

export default defineComponent({
  name: 'NewsGridColumn',
  props: {
    news: {
      type: Object as PropType<NewsType>,
      required: true
    }
  },
  setup() {
    const isHover = ref(false)

    const mouseOverAction = () => {
      isHover.value = true;
    }
    const mouseLeaveAction = () => {
      isHover.value = false;
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
  margin: 0;
  padding: 0.2rem;
  h4,h5.news-title {
    font-size: small;
    font-weight: bold;
    color: white;
    background-color: rgba($color: black, $alpha: 1.00);
    text-shadow: 1px 1px 4px black; 
    margin: 0;
    padding: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .news-image {
    overflow:hidden;
    background-position: center center;
    background-size: cover;
    height: 15rem;
    margin: 0;
    padding: 0;
  }
  .news-information{
    overflow:hidden;
    color: white;
    background-color: black;
    height: 15rem;
    margin: 0;
    padding: 0;
    text-align: left;
    .feature-comment {
      margin: 0.8rem 0 0 0;
      padding: 0;
    }
  }
}
</style>
