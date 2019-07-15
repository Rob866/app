import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('history', {
      params: {
        userId: params.userId
      }
    })
  },
  post (history) {
    return Api().post('history', history)
  },
  delete (songId) {
    return Api().delete(`history/${songId}`)
  }
}
