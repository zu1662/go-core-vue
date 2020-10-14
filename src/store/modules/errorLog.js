const errorLog = {
  state: {
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    },
    CLEAR_ERROR_LOG: (state) => {
      state.logs.splice(0)
    }
  },
  actions: {
    addErrorLog ({ commit }, log) {
      return new Promise(resolve => {
        commit('ADD_ERROR_LOG', log)
        resolve()
      })
    },
    clearErrorLog ({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_ERROR_LOG')
        resolve()
      })
    }
  }
}

export default errorLog
