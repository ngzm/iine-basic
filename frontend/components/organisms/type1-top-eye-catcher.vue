<template>
  <header
    class="type1-top-eye-catcher"
    :style="{ 'background-image': `url(${eyeCatch.image || ''})` }"
  >
    <top-eyecatch-to-edit class="type1-top-eye-catcher__to-edit" />

    <section class="type1-top-eye-catcher__titles">
      <h2>{{ eyeCatch.title || '' }}</h2>
      <p>{{ eyeCatch.subtitle || '' }}</p>
    </section>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import eyeCatchHandler from '@/composable/eye-catch-handler'
import TopEyecatchToEdit from '~/components/organisms/top-eyecatch-to-edit.vue'

export default defineComponent({
  name: 'TopEyeCatcher',
  components: { TopEyecatchToEdit },
  setup() {
    const { eyeCatch, loadEyeCatch } = eyeCatchHandler()
    onMounted(() => {
      loadEyeCatch()
    })
    return { eyeCatch }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.type1-top-eye-catcher {
  height: 100vh;
  min-height: 400px;
  position: relative;
  background-position: center center;
  background-size: cover;
  &__to-edit {
    position: absolute;
    top: calc($nav-header-height + 1rem);
    right: 1rem;
  }
  &__titles {
    position: absolute;
    display: inline-block;
    bottom: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    h2,p {
      padding: 0;
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
  .type1-top-eye-catcher {
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
