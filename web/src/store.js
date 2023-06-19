import { createStore } from 'vuex'

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTIATED", // 是否认证通过
  SET_USER: "SET_USER", // 用户信息
};

const state = {
  isAuthenticated: false,
  user: {}
}


const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}

const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },

  [types.SET_USER](state, user) {
    if (user) state.user = user
    else state.user = {}
  }
}

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },

  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
  }
}
export default createStore({
  state,
  getters,
  mutations,
  actions,
})
