import { GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/store-types'
interface CounterState {
  count: number
}

export const state = (): CounterState => ({
  count: 0
})

export const mutations: MutationTree<CounterState> = {
  increment: (state: CounterState) => {
    console.log('Call the mutations increment')
    state.count++
  },
  decrement: (state: CounterState) => {
    console.log('Call the mutations decrement')
    state.count--
  }
}

export const getters: GetterTree<CounterState, RootState> = {
  show: (state) => state.count,
}
