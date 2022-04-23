interface TestAuthState {
  loggedIn: boolean
}

export const state = (): TestAuthState => ({
  loggedIn: true
})
