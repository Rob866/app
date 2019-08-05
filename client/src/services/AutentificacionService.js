import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  update (params) {
    return Api().put(`user/${params.userId}`, params.user)
  }
}
