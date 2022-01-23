<template>
  <div class="feature-grid-container">
    <p
      v-for="feature in featuresList"
      :key="feature.id"
      class="grid-box"
    >
      <ul>
        <li class="feature-title">{{ feature.title }}</li>
        <li class="feature-image" :style="`background-image: url(${feature.listImage})`"></li>
        <li class="feature-comment">{{ feature.listComment }}</li>
      </ul>
    </p>
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
  padding: 0 2em;
  max-width: 95em;
  .grid-box {
    margin: 1em 2em;
    padding: 0;
    text-align: center;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin: 0.8em 0;
        padding: 0;
        max-width: 20em;
        min-width: 16em;
      }
      li.feature-title {
        text-align: center;
        font-weight: bold;
      }
      li.feature-image {
        height: 16em;
        border-radius: 50%;
        overflow:hidden;
        background-position: center center;
        background-size: cover;
      }
      li.feature-image:hover {
        opacity: 0.6;
      }
      li.feature-comment {
        text-align: left;
      }
    }
  }
}
</style>
