export const state = () => ({
  list: []
})

export const mutations = {
  add(state, section) {
    state.list.push(section)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}
