<template>
  <div
    class="section-eye-catcher"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <div>
      <h4><slot /></h4>
      <p v-if="$slots.subtitle"><slot name="subtitle" /></p>
    </div>
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
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

$eye-catcher-height: 380px;
$eye-catcher-height-sm: 240px;

.section-eye-catcher {
  line-height: $eye-catcher-height;
  text-align: center;
  background-position: center center;
  background-size: cover;
  div {
    display: inline-block;
    background-color: rgba(0,0,0,0.5);
    line-height: normal;
    padding: 1em;
    vertical-align: middle;
    h4,p {
      color: white;
      font-weight: bold;
      text-shadow: 1px 1px 6px black; 
      margin: 0;
    }
    h4 {
      font-size: 1.25em;
    }
    p {
      font-size: 1.0em;
      margin-top: 0.5em;
    }
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .section-eye-catcher {
    line-height: $eye-catcher-height-sm;
  }
}
</style>
