<template>
  <div class="frame-wrap">
    <div v-if="status === 'authorizing'">
      <p>管理ユーザ権限を確認中です・・・</p>
    </div>
    <div v-else class="infomation-card">
      <p>申し訳ございません</p>
      <p>管理ユーザ権限を確認できませんでした</p>
      <p class="mt-4">
        <b-btn @click="redirect">TOPページへ</b-btn>
      </p>
    </div>
  </div>
</template>
  
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AuthCustomerUser',
  layout: 'simple',
  data() {
    return {
      status: 'authorizing'
    }
  },
  mounted: async function() { // eslint-disable-line object-shorthand
    const code = this.$route.query ? this.$route.query.code : ''
    if (this.$route.query.code) {
      this.$router.replace({ query: {} })

      await this.$auth.loginWith('local', { data: { code } }).catch(() => {
        this.status = 'authError'
      })
    } else {
      this.status = 'authError'
    }
  },
  methods: {
    redirect () {
      return this.$router.push('/')
    }
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
