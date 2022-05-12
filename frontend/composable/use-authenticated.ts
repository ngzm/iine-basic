import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

export const useAuthenticated = () => {
  const { $auth } = useContext()
  const isAuthenticated = ref(false)
  onMounted(() => {
    isAuthenticated.value = $auth.loggedIn
  })

  return {
    isAuthenticated,
  }
}
