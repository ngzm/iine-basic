// 現在のURLから顧客IDを取得する
export default async ({ store }) => {
  const url = 'www.longlivenet.com'
  const customerId = await store.dispatch('customer/fetchCustomerBySiteUrl', url)

  // TODO: debug
  console.log('customerId', customerId)
}
