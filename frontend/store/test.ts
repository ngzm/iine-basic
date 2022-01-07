import { MutationTree } from 'vuex'

export const state = () => ({
  count: 0
})

export type CounterState = ReturnType<typeof state>

export const mutations: MutationTree<CounterState> = {
  increment: (state) => {
    console.log('Call the mutations increment')
    state.count++
  },
  decrement: (state) => {
    console.log('Call the mutations decrement')
    state.count--
  }
}
