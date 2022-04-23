import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/types/store-types'
import { CustomerType } from '@/types/customer-type'

interface CustomerState {
  customer: CustomerType,
}

export const state = (): CustomerState => ({
  customer: {} as CustomerType,
})

export const getters: GetterTree<CustomerState, RootState> = {
  customer(state) { return state.customer },
  customerId(state) { return state.customer.id },
}

export const mutations: MutationTree<CustomerState> = {
  SET_CUSTOMER(state: CustomerState, customer: CustomerType) {
    state.customer = customer
  }
}

export const actions: ActionTree<CustomerState, RootState> = {
  async fetchCustomerBySiteUrl({ commit }, siteUrl: string) {
    const customer: CustomerType = await this.$axios.$get('/customers/customer-url', { params: { url: siteUrl } })
    if (!customer || !customer.id) return 0

    commit('SET_CUSTOMER', customer)
    return customer.id
  },
}
