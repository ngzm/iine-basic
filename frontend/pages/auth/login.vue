<template>
  <div class="wrap">
    <button class="button" @click="login()">
      ログイン
    </button>
  </div>
</template>
  
<script>
export default {
  name: 'AuthLogin',
  layout: 'simple',
  methods: {
    login () {
      this.$auth.loginWith('auth0')
    } 
  }   
}     
</script>
  
<style scoped>
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}   
    
.button {
  font-size: 2rem;
}
</style>
