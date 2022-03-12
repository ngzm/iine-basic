import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '@/types/store-types'
import { NewsType } from '@/types/content-type'
import { fetchNewsList } from '@/utils/data-service'

interface NewsSate {
  newsList: NewsType[],
}

export const state = (): NewsSate => ({
  newsList: [],
})

export const getters: GetterTree<NewsSate, RootState> = {
  newsList: (state) => state.newsList,
}

export const mutations: MutationTree<NewsSate> = {
  setNewsList: (state: NewsSate, newsList: NewsType[]) => {
    state.newsList = newsList
  },
  mergeNewsList: (state: NewsSate, updated: NewsType) => {
    const target = state.newsList.find((d) => d.id === updated.id)
    if (target) {
      Object.assign(target, updated)
    }
  },
}

export const actions: ActionTree<NewsSate, RootState> = {
  fetchNewsList: async ({ commit }, params: { userId: number, maxLimit?: number }) => {
    const maxLimit = params.maxLimit || 1000
    const newsList = await fetchNewsList(params.userId, maxLimit)
    console.log('newsList', newsList)
    commit('setNewsList', newsList)
  }
}
