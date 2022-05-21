import { useStore } from '@nuxtjs/composition-api'
import { CustomerType } from '@/types/customer-types'

export const useCurrentCustomer = () => {
  const { getters } = useStore()
  const customer = getters['customer/customer'] as CustomerType
  const headInfo = {
    title: customer.name ?? 'IINE',
    content: `${customer.name ?? 'IINE'} Website`,
    favicon: customer.template
      ? `favicon-${customer.template}.ico`
      : 'favicon.ico',
  }

  return {
    customer,
    customerId: customer.id,
    template: customer.template,
    headInfo,
  }
}
