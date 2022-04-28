import { useStore } from '@nuxtjs/composition-api'

export const useCurrentCustomer = () => {
  const { getters } = useStore()
  const customerId = getters['customer/customerId']
  return { customerId }
}
