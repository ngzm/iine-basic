<template>
  <div class="contact-form-result">
    <h5>お問合せありがとうございます</h5>
    <p>お問い合せを受け付けました</p>
    <div class="contact-form-result__action">
      <b-button @click="$emit('ok')">
        戻る
      </b-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContactFormResult',
})
</script>

<style lang="scss" scoped>
.contact-form-result {
  h5 {
    font-size: normal;
    font-weight: bold;
  }
  &__action {
    text-align: center;
  }
}
</style>
