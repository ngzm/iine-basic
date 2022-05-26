<template>
  <div
    class="top-to-button"
    :class="{ 'button-active': isScrollOverTheWindow }"
  >
    <b-avatar
      v-scroll-to="{ el: '#index-top-position', offset: -180 }"
      button
      :src="src"
      class="top-to-button__avatar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useWindow } from '@/composable/use-window'

export default defineComponent({
  name: 'TopToButton',
  props: {
    src: {
      type: String,
      default: '/image/arrow-up1.png',
    },
  },
  setup() {
    const { windowHeight, scrollY } = useWindow()
    const isScrollOverTheWindow = computed(
      () => scrollY.value > windowHeight.value * 0.75
    )
    return {
      isScrollOverTheWindow,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.top-to-button {
  position: fixed;
  right: 2rem;
  bottom: 3rem;
  text-align: center;
  transition: all 1s;
  transform: translateY(3rem);
  opacity: 0;
  visibility: hidden;
  &__avatar {
    width: 4rem;
    height: 4rem;
  }
}
.top-to-button::after {
  content: 'TOP';
  font-weight: bold;
  display: block;
  margin-top: 0.5rem;
}

.button-active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .top-to-button {
    right: 1rem;
    bottom: 1.8rem;
    &__avatar {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .top-to-button::after {
    font-size: small;
  }
}
</style>
