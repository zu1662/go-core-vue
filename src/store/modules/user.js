import Vue from 'vue'
import { login, getInfo, logout, getMenuList } from '@/api/user'
import { ACCESS_TOKEN, SET_LOCKER, LOCKER_PSW, LOCKER_REDIRECT } from '@/config/variableInit'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    permissions: [],
    info: {},
    locker: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOCKER: (state, locker) => {
      state.locker = locker
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSION: (state, permissions) => {
      state.permissions = permissions
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          Vue.ls.set(ACCESS_TOKEN, result.token, result.expire)
          commit('SET_TOKEN', result.token)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          commit('SET_INFO', result)
          commit('SET_NAME', result.userName)
          commit('SET_AVATAR', result.avatar)

          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetMenuList ({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuList().then(response => {
          const result = response.data
          if (result && result.length > 0) {
            commit('SET_PERMISSION', result)
          } else {
            reject(new Error('getInfo: permissions must be a non-null array !'))
          }

          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve) => {
        logout().then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          // remove token & permissions
          commit('SET_TOKEN', '')
          commit('SET_PERMISSION', [])
          Vue.ls.remove(ACCESS_TOKEN)

          // remove locker datas
          commit('SET_LOCKER', '')
          Vue.ls.remove(SET_LOCKER)
          Vue.ls.remove(LOCKER_PSW)
          Vue.ls.remove(LOCKER_REDIRECT)
        })
      })
    },

    // 锁屏
    SetLocker ({ commit }, locker) {
      return new Promise((resolve) => {
        if (locker) {
          Vue.ls.set(SET_LOCKER, locker.isLocked)
          Vue.ls.set(LOCKER_PSW, locker.password)
          Vue.ls.set(LOCKER_REDIRECT, locker.redirect)
          commit('SET_LOCKER', locker)
          resolve()
        }
      })
    },

    // 锁屏登陆
    LockerIn ({ commit }, lockerPass) {
      return new Promise((resolve) => {
        if (Vue.ls.get(LOCKER_PSW) === lockerPass) {
          const redirect = Vue.ls.get(LOCKER_REDIRECT)
          Vue.ls.remove(SET_LOCKER)
          Vue.ls.remove(LOCKER_PSW)
          Vue.ls.remove(LOCKER_REDIRECT)
          commit('SET_LOCKER', '')
          resolve({
            code: 1,
            message: 'success',
            redirect: redirect
          })
        } else {
          resolve({
            code: 0,
            message: '密码不匹配'
          })
        }
      })
    }

  }
}

export default user
