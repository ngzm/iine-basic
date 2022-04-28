import { ref } from '@nuxtjs/composition-api'
import useMakeToast, { ToastParams } from '@/composable/use-make-toast'

export function useContentNotFound() {
  const notFound = ref(false)

  const resetNotFound = () => {
    notFound.value = false
  }

  const { addToast } = useMakeToast()
  const warnNotFound = () => {
    notFound.value = true
    addToast({
      title: 'WARNING',
      message: '情報が見つかりませんでした',
      variant: 'danger',
    } as ToastParams)
  }

  return {
    notFound,
    resetNotFound,
    warnNotFound,
  }
}
