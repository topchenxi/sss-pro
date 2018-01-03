const state = {
  loading: true,
  popLoad: false
}

// mutations
const mutations = {
  changeload (state, { load }) {
    state.loading = load
  },
  changePopLoad (state, { popload }) {
    state.popLoad = popload
  }
}

export default {
  state,
  mutations
}
