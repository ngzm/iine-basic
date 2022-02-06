<template>
  <div class="contents-grid-container">
    <section
      v-for="content in contentsList"
      :key="content.id"
      class="grid-box"
    >
      <h5 class="content-title">{{ content.title }}</h5>
      <div class="content-image" :style="`background-image: url(${content.image || ''})`"></div>
      <p class="content-comment">{{ content.comment || content.body || '' }}</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ContentType } from '~/types/content-type'

export default defineComponent({
  name: 'ContentsGrid',
  props: {
    contentsList: {
      type: Array as PropType<ContentType[]>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
.contents-grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 90rem;
  .grid-box {
    margin: 1.8rem 1.5rem 0 1.5rem;
    padding: 0;
    max-width: 20rem;
    min-width: 16rem;
    text-align: center;
    h4,h5.content-title {
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
      margin: 0 0 0.5rem 0;
      padding: 0;
    }
    .content-image {
      height: 16rem;
      border-radius: 50%;
      overflow:hidden;
      background-position: center center;
      background-size: cover;
      margin: 0;
      padding: 0;
    }
    .content-image:hover {
      opacity: 0.6;
    }
    .content-comment {
      margin: 0.8rem 0 0 0;
      padding: 0;
      text-align: left;
    }
  }
}
</style>
