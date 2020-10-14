import Vue from 'vue'

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Vue.ls.set('sidebarStatus', 1)
      } else {
        Vue.ls.set('sidebarStatus', 0)
      }
    },
    OPEN_SIDEBAR: (state, withoutAnimation) => {
      Vue.ls.set('sidebarStatus', 1)
      state.sidebar.opened = true
      state.sidebar.withoutAnimation = withoutAnimation
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Vue.ls.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    openSideBar ({ commit }, { withoutAnimation }) {
      commit('OPEN_SIDEBAR', withoutAnimation)
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
