import { ref, useStore } from '@nuxtjs/composition-api'

export function useContentLoading() {
  const { dispatch } = useStore()

  const loading = ref(true)
  const buzyId = dispatch('buzy/buzyId')

  const startLoading = () => {
    loading.value = true
    dispatch('buzy/buzyOn', buzyId)

    // TODO: 暫定
    // 無限にloadingしないように
    setTimeout(() => { endLoading() }, 8000)
  }

  const endLoading = () => {
    loading.value = false
    dispatch('buzy/buzyOff', buzyId)
  }

  return {
    loading,
    startLoading,
    endLoading
  }
}
