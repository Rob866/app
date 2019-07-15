import Api from '@/services/Api'

export default {
  index (params) {
    if (params.songId) {
      return Api().get('bookmarks', {
        params: {
          userId: params.userId,
          songId: params.songId
        }
      })
    } else {
      return Api().get('bookmarks', {
        params: {
          userId: params.userId
        }
      })
    }
  },
  post (params) {
    return Api().post('bookmarks', {
      userId: params.userId,
      songId: params.songId
    })
  },
  delete (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  },
  deleteAll (userId) {
    return Api().delete(`bookmarks/all/${userId}`)
  }
}
