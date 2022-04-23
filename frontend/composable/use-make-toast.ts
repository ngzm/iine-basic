import { ref, reactive } from '@nuxtjs/composition-api'

export interface ToastParams {
  title: string
  message: string
  variant: string
}

const toastParams: ToastParams = reactive({
  title: 'Toast',
  message: 'Completed !',
  variant: 'default'
})

const addTrriger = ref(false)

export default () => {
  const addToast = (params: ToastParams) => {
    Object.assign(toastParams, params)
    setAddTrriger(true)
  }

  const setAddTrriger = (v: boolean) => { addTrriger.value = v }

  return {
    toastParams,
    addToast,
    addTrriger,
    setAddTrriger
  }
}

