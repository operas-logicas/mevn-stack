import jwt from 'jsonwebtoken'
import http from './HttpService'
import store from '../store'

class AuthService {
  _decodeToken() {
    const token = this.getToken()
    if (!token) return null

    return jwt.decode(token)
  }

  async _setToken(token) {
    localStorage.setItem('token', token)
    await store.dispatch('authenticate') 
  }

  getToken() {
    return localStorage.getItem('token')
  }
  
  getUsername() {
    const user = this._decodeToken()
    if (!user) return null

    return user.username
  }

  getUserId() {
    const user = this._decodeToken()
    if (!user) return null

    return user.id
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
