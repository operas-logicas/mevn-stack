import { http } from './HttpService'
import store from '../store'

class AuthService {
  async _setToken(token) {
    localStorage.setItem('token', token)
    await store.dispatch('authenticate') 
  }
  
  getUsername() {
    return 'robert'
  }

  getUserId() {
    return 1
  }
  
  isLoggedIn() {
    return localStorage.getItem('token') !== null
  }
  
  async login(user) {
    try {
      const token = (await http().post('/auth', user)).data.token
      this._setToken(token)
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    localStorage.clear()
    await store.dispatch('authenticate')
  }

  async register(user) {
    try {
      return await http().post('/register', user)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new AuthService()
