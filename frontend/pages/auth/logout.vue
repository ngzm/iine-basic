<template>
  <div class="wrap">
    <p>[{{ $auth.user }}]</p>
    <p>{{ $auth.strategy.token.get() }}</p>
    <p>ログアウトしました</p>
    <p>
      <nuxt-link to="/">
        HOME
      </nuxt-link>
    </p>
  </div>
</template>
  
<script>
export default {
  name: 'AuthLogout',
  layout: 'simple',
}     
</script>
  
<style scoped>
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}   
</style>
