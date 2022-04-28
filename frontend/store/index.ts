import { ActionTree } from 'vuex'
import { RootState } from '@/types/store-types'

export const state = (): RootState => ({
  version: '1.0.0',
})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('customer/fetchCustomerBySiteUrl', req.headers.host)
  },
}
