<template>
  <div
    class="contents-eye-catcher"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TopEyeCatcher',
  props: {
    backgroundImage: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$eye-catcher-height: 380px;
$eye-catcher-height-sm: 240px;

.contents-eye-catcher {
  line-height: $eye-catcher-height;
  text-align: center;
  background-position: center center;
  background-size: cover;
  h2,h3,h4 {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    padding: 14px;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 6px black; 
    background-color: rgba(0,0,0,0.5);
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .pr_eyecatch {
    line-height: $eye-catcher-height-sm;
  }
}
</style>
