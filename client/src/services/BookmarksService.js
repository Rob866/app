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
  // Obtener el numero de bookmarks que tiene una canción en especifico
  // Cada bookmarks  tiene un usuario diferente por tanto cada usuario
  // representa  un favorito
  indexBookmarks (userId) {
    return Api().get(`bookmarks/allbookmarks/${userId}`)
  },
  indexAll () {
    return Api().get('bookmarks/sort/allbookmarks')
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
