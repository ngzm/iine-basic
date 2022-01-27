<template>
  <div class="feature-grid-container">
    <section
      v-for="feature in featuresList"
      :key="feature.id"
      class="grid-box"
    >
      <h5 class="feature-title">{{ feature.title }}</h5>
      <div class="feature-image" :style="`background-image: url(${feature.listImage})`"></div>
      <p class="feature-comment">{{ feature.listComment }}</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { FeatureListItem } from '~/types/feature-type'

export default defineComponent({
  name: 'FeatureGrid',
  props: {
    category: {
      type: String,
      required: true
    },
    featuresList: {
      type: Array as PropType<FeatureListItem[]>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
.feature-grid-container {
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
    h4,h5.feature-title {
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
      margin: 0 0 0.5rem 0;
      padding: 0;
    }
    .feature-image {
      height: 16rem;
      border-radius: 50%;
      overflow:hidden;
      background-position: center center;
      background-size: cover;
      margin: 0;
      padding: 0;
    }
    .feature-image:hover {
      opacity: 0.6;
    }
    .feature-comment {
      margin: 0.8rem 0 0 0;
      padding: 0;
      text-align: left;
    }
  }
}
</style>
