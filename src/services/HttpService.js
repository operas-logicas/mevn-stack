import axios from 'axios'
import auth from './AuthService'
import store from '../store'

export default function http() {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: { Authorization: auth.getToken() }
  })
}
