import store from '../store'

class AuthService {
  async _setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
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
  
  login() {
    const token = {
      username: 'robert'
    }
    this._setToken(token)
  }
}

export default new AuthService