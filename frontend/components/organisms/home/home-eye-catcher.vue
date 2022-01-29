<template>
  <header
    class="home-eye-catcher"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <section class="home-eye-catcher__titles">
      <h2>情報技術をチカラにしたい！</h2>
      <p>ロングリブネットがサポートいたします</p>
    </section>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HomeEyeCatcher',
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

.home-eye-catcher {
  height: 100vh;
  min-height: 500px;
  position: relative;
  background-position: center center;
  background-size: cover;
  &__titles {
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
      font-size: 2rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .home-eye-catcher {
    height: 50vh;
    div {
      h2 {
        font-size: 1.8rem;
        font-weight: bolder;
      }
      p {
        font-size: 1.2rem;
        font-weight: bolder;
      }
    }
  }
}
</style>
