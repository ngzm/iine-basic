<template>
  <div class="frame-wrap">
    <div class="infomation-card">
      <h5>管理ユーザをログアウトしました</h5>
      <p>ページの閲覧は可能です</p>
      <p>
        <b-btn class="mt-4" @click="redirect">TOPページへ</b-btn>
      </p>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, onMounted, useRouter, } from '@nuxtjs/composition-api'
import { inactivate } from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'AuthLogout',
  layout: 'simple',
  setup() {
    const router = useRouter()

    onMounted(() => {
      inactivate()
    })

    const redirect = () => {
      router.push({ name: 'index' })
    }

    return { redirect }
  }
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
