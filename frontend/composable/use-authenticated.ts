import { ref, onMounted, computed, useContext } from '@nuxtjs/composition-api'

const isPreview = ref(false)

export const useAuthenticated = () => {
  const { $auth } = useContext()

  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })
  const isAuthenticated = computed(() => isMounted.value && $auth.loggedIn)
  const loginUser = computed(() =>
    $auth.loggedIn ? $auth.user?.name ?? 'no-name' : 'no-login'
  )

  const isEditable = computed(() => isAuthenticated.value && !isPreview.value)
  const isOnPreview = computed(() => isAuthenticated.value && isPreview.value)
  const togglePreview = () => {
    isPreview.value = !isPreview.value
  }

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

  return {
    login,
    logout,
    isAuthenticated,
    loginUser,
    isEditable,
    isOnPreview,
    togglePreview,
  }
}
