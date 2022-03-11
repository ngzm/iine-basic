<template>
  <div class="inquire-form-result">
    <h5>お問合せありがとうございます</h5>
    <p>
      お問い合せを受け付けました。<br />
      追ってメールにてご連絡いたします。
    </p>
    <div class="inquire-form-result__action">
      <b-button @click="$emit('ok')">
        入力フォームに戻る
      </b-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InquireFormResult',
})
</script>

<style lang="scss" scoped>
.inquire-form-result {
  h5 {
    font-size: normal;
    font-weight: bold;
  }
  p {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  &__action {
    text-align: center;
  }
}
</style>
