import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get(`user/songs/${params.userId}`)
  },
  indexUser (params) {
    return Api().get(`user/${params.userId}`)
  }
}
