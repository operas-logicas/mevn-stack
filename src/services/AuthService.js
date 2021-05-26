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
    const token = (await http().post('/auth', user)).data.token
    this._setToken(token)
  }

  async logout() {
    localStorage.clear()
    await store.dispatch('authenticate')
  }

  register(user) {
      return http().post('/register', user)
  }
}

export default new AuthService()
