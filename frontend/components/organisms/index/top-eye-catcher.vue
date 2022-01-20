<template>
  <section id="top-eye-catcher-section">
    <div
      class="top-eye-catcher"
      :style="{ 'background-image': `url(${backgroundImage})` }"
    >
      <div>
        <h2>情報技術をチカラにしたい！</h2>
        <p>ロングリブネットがサポートいたします</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TopEyeCatcher',
  setup() {
    const backgroundImage = ref('');

    onMounted(() => {
      backgroundImage.value = 'https://longlivenet.com/static/images/top01.jpg';
    })

    return {
      backgroundImage
    }
  },
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

#top-eye-catcher-section {
  .top-eye-catcher {
    height: 100vh;
    min-height: 500px;
    position: relative;
    background-position: center center;
    background-size: cover;
    div {
      position: absolute;
      display: inline-block;
      bottom: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      h2,p {
        text-align: center;
        white-space: nowrap;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 6px black; 
      }
      h2 {
        font-size: 2em;
      }
      p {
        font-size: 1.4em;
      }
    }
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  #top-eye-catcher-section {
    .top-eye-catcher {
      height: 50vh;
      div {
        h2 {
          font-size: 1.8em;
          font-weight: bolder;
        }
        p {
          font-size: 1.2em;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
