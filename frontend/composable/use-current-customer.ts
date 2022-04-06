import { useStore } from '@nuxtjs/composition-api'

export function useCurrentCustomer() {
  const { getters } = useStore()
  const customerId = getters['customer/customerId']
  return { customerId }
}
