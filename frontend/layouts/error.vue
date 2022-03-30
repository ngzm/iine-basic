<template>
  <div class="container mt-5">
    <b-card title="エラーが発生しました">
      申し訳ありません。エラーが発生しました。

      <p class="mt-5">statusCode: {{ error.statusCode }}</p>
      <p>message: {{ error.message }}</p>

      <b-btn class="mt-5" @click="redirect">TOPページへ</b-btn>
    </b-card>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ErrorLayout',
  layout: 'simple',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  methods: {
    redirect () {
      return this.$route.name === 'index' ? this.$router.go() : this.$router.push('/')
    }
  }
})
</script>
