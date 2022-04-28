<template>
  <div class="frame-wrap">
    <div class="infomation-card">
      <h5>管理ユーザをログアウトしました</h5>
      <p>ページの閲覧は可能です</p>
      <div class="mt-4">
        <b-btn @click="redirect">TOPページへ</b-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AuthLogout',
  layout: 'simple',
  setup() {
    const router = useRouter()
    const redirect = () => {
      router.push({ name: 'index' })
    }
    return { redirect }
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
