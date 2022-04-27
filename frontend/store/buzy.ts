import { v4 as uuidv4 } from 'uuid'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/types/store-types'
import { sleep } from '@/utils/common-utils'

interface BuzyState {
  buzyIdArray: string[]
}

export const state = (): BuzyState => ({
  buzyIdArray: [] as string[],
})

export const getters: GetterTree<BuzyState, RootState> = {
  isBuzy: (state) => state.buzyIdArray.length > 0,
}

export const mutations: MutationTree<BuzyState> = {
  ADD_BUZY_ID: (state: BuzyState, buzyId: string) => {
    state.buzyIdArray.push(buzyId)
  },
  REMOVE_BUZY_ID: (state: BuzyState, buzyId: string) => {
    state.buzyIdArray = state.buzyIdArray.filter((s) => s !== buzyId)
  },
}

export const actions: ActionTree<BuzyState, RootState> = {
  buzyId: () => uuidv4(),
  buzyOn: ({ commit }, buzyId) => {
    commit('ADD_BUZY_ID', buzyId)

    // 無限にBuzyになるのを避けるため遅くとも10秒後には解放する
    setTimeout(() => {
      commit('REMOVE_BUZY_ID', buzyId)
    }, 10000)
  },
  buzyOff: ({ commit }, buzyId) => {
    commit('REMOVE_BUZY_ID', buzyId)
  },
  buzyWait: async ({ getters }, timeout = 5000) => {
    const initialGap = 200
    await sleep(initialGap)

    const interbal = 300
    const imax = Math.floor(timeout / interbal)
    for (let i = 0; getters.isBuzy && i <= imax; i++) {
      await sleep(interbal)
    }
  },
  // TODO: depricate
  runBuzyJob: async ({ commit }, { job }) => {
    const buzyId = uuidv4()
    commit('ADD_BUZY_ID', buzyId)
    await job()
    commit('REMOVE_BUZY_ID', buzyId)
  },
}
