import { ref, onMounted, computed, useContext } from '@nuxtjs/composition-api'

export const useAuthenticated = () => {
  const { $auth, $axios } = useContext()

  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })
  const isAuthenticated = computed(() => isMounted.value && $auth.loggedIn)
  const loginUser = computed(() =>
    $auth.loggedIn ? $auth.user?.name ?? 'no-name' : 'no-login'
  )

  const login = async (
    payload: { [key: string]: string },
    statusOk: string = 'ok',
    statusNg: string = 'ng'
  ) => {
    let status = statusOk
    await $auth.loginWith('local', { data: payload }).catch((e) => {
      // eslint-disable-next-line no-console
      console.log('#### login error ####', e)
      status = statusNg
    })
    return status
  }

  const logout = () => {
    $auth.logout()
  }

  const changePassword = async (password: string) => {
    await $axios.$put('/auth/customer-user/password', {
      password,
    })
  }

  return {
    login,
    logout,
    changePassword,
    isAuthenticated,
    loginUser,
  }
}
