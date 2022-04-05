import { ref } from '@nuxtjs/composition-api'
import { ToastParams, addToast } from '@/components/molecules/make-toast-trigger'

export function useContentNotFound() {
  const notFound = ref(false)

  const resetNotFound = () => { notFound.value = false }

  const warnNotFound = () => {
    notFound.value = true
    addToast({
      title: 'WARNING',
      message: '情報が見つかりませんでした',
      variant: 'danger'
    } as ToastParams)
  }

  return {
    notFound,
    resetNotFound,
    warnNotFound
  }
}
