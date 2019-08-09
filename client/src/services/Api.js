import axios from 'axios'
import store from '@/store/store'
export default () => {
  let axiosConfig = axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
  axiosConfig.interceptors.request.use((config) => {
    store.dispatch('setLoading', true)
    return config
  }, (error) => {
    store.dispatch('setLoading', true)
    return Promise.reject(error)
  })
  axiosConfig.interceptors.response.use((response) => {
    store.dispatch('setLoading', false)
    return response
  }, function (error) {
    store.dispatch('setLoading', false)
    return Promise.reject(error)
  })
  return axiosConfig
}
