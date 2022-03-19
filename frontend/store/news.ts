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

const newsesSorter = (list: NewsType[]) => (
  list.sort((a: NewsType, b: NewsType) => {
    if (a.publishOn > b.publishOn) return -1
    else if (a.publishOn < b.publishOn) return 1
    return 0
  })
)

export const getters: GetterTree<NewsSate, RootState> = {
  newsList: (state) => state.newsList,
  isFetched: (state) => state.newsList.length > 0
}

export const mutations: MutationTree<NewsSate> = {
  setNewsList: (state: NewsSate, newsList: NewsType[]) => {
    state.newsList = newsesSorter(newsList)
  },
  mergeToNewsList: (state: NewsSate, updated: NewsType) => {
    const newsList = Array.from(state.newsList)
    const target = newsList.find((d) => d.id === updated.id)
    if (target) {
      Object.assign(target, updated)
    }
    state.newsList = newsesSorter(newsList)
  },
  addToNewsList: (state: NewsSate, created: NewsType) => {
    const newsList = Array.from(state.newsList)
    newsList.push(created)
    state.newsList = newsesSorter(newsList)
  },
  reoveFromNewsList: (state: NewsSate, id: number) => {
    const target = state.newsList.find((d) => d.id === id)
    if (target) {
      target.removed = true
    }
    state.newsList = state.newsList.filter((n) => !n.removed)
  },
}

export const actions: ActionTree<NewsSate, RootState> = {
  fetchNewsList: async ({ commit }, params: { userId: number, maxLimit?: number }) => {
    const maxLimit = params.maxLimit || 500
    const newsList = await fetchNewsList(params.userId, maxLimit)
    commit('setNewsList', newsList)
  },
}
