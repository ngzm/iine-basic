// 現在のURLから顧客IDを取得する
export default async ({ store, error }) => {
  const currentCustomer = store.getters['customer/customer']
  if (currentCustomer && currentCustomer.id) {
    console.log('customerId found: ', currentCustomer.id) // eslint-disable-line no-console
    return
  }

  const url = 'www.longlivenet.com'
  const customerId = await store.dispatch('customer/fetchCustomerBySiteUrl', url)
  console.log('customerId fetched: ', customerId) // eslint-disable-line no-console

  if (!customerId) error({statusCode: '404', message: 'ご指定のサイトアドレスは登録されておりません' })
}
