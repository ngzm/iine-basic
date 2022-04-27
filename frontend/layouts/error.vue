<template>
  <div class="frame-wrap">
    <div class="infomation-card">
      <h5>エラーが発生しました</h5>
      <p>申し訳ありません。エラーが発生しました。</p>

      <p class="mt-4">statusCode: {{ error ? error.statusCode : 'no code' }}</p>
      <p>message: {{ error ? error.message : 'no message' }}</p>
      <div class="mt-4">
        <b-btn @click="redirect">TOPページへ</b-btn>
      </div>
    </div>
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
      default: null,
    },
  },
  methods: {
    redirect() {
      return this.$route.name === 'index'
        ? this.$router.go()
        : this.$router.push('/')
    },
  },
})
</script>

<style scoped>
.frame-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.infomation-card {
  background-color: white;
  padding: 2.5rem;
}
</style>
