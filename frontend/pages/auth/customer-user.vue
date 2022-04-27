<template>
  <div class="frame-wrap">
    <div v-if="status === 'authorizing'">
      <p>管理ユーザ権限を確認中です・・・</p>
    </div>
    <div v-else class="infomation-card">
      <p>申し訳ございません</p>
      <p>管理ユーザ権限を確認できませんでした</p>
      <div class="mt-4">
        <b-btn @click="$router.push('/')">TOPページへ</b-btn>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  useRoute,
  useRouter,
  useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AuthCustomerUser',
  layout: 'simple',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { $auth } = useContext()
    const status = ref('authorizing')

    onMounted(async () => {
      if (route.value.query && route.value.query.code) {
        const code = route.value.query ? route.value.query.code : ''
        router.replace({ query: {} })

        await $auth.loginWith('local', { data: { code } }).catch(() => {
          status.value = 'authError'
        })
      } else {
        status.value = 'authError'
      }
    })

    return { status }
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
