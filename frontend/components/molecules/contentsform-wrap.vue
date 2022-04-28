<template>
  <div class="contentsform-wrap">
    <b-overlay :show="overlay" opacity="0.75">
      <slot>
        <p>フォーム表示準備中・・・</p>
      </slot>
      <template v-if="$slots.overlay" #overlay>
        <slot name="overlay" />
      </template>
    </b-overlay>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentsformWrap',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.contentsform-wrap {
  margin: 0;
  padding: 0;
}
</style>
