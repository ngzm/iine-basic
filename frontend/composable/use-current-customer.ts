import { useStore } from '@nuxtjs/composition-api'

export const useCurrentCustomer = () => {
  const { getters } = useStore()
  const customer = getters['customer/customer']
  return {
    customer,
    customerId: customer.id,
  }
}
