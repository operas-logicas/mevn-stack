import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../services/AuthService'

Vue.use(Vuex)

const protocol = window.location.protocol
const hostname = window.location.hostname
const port = 3000

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: protocol + '//' + hostname + ':' + port + '/api',
    username: null,
    userId: null
  },

  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      
      if (state.isLoggedIn) {
        state.username = auth.getUsername()
        state.userId = auth.getUserId()
      } else {
        state.username = null
        state.userId = null
      }
    }
  },

  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
