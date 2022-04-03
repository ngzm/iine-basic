import { ref, reactive } from '@nuxtjs/composition-api'

export interface ToastParams {
  title: string
  message: string
  variant: string
}

export const toastParams: ToastParams = reactive({
  title: 'Toast',
  message: 'Completed !',
  variant: 'default'
})

export const addToast = (params: ToastParams) => {
  Object.assign(toastParams, params)
  setAddTrriger(true)
}

export const addTrriger = ref(false)
export const setAddTrriger = (v: boolean) => { addTrriger.value = v }
