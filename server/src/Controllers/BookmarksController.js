const { Bookmark, Song } = require('../models')

module.exports = {
  async index (req, res) {
    // req user autentificacion se obtiene del middleware esta Autentificado
    const userId = req.user.id
    const { songId } = req.query
    if (songId) {
      try {
        const bookmark = await Bookmark.findOne({
          where: {
            UserId: userId,
            SongId: songId
          }
        })
        res.send(bookmark)
      } catch (err) {
        res.status(500).send({
          error: 'error al tratar de obtener el bookmark'
        })
      }
    } else {
      try {
        const bookmarks = await Bookmark.findAll({
          where: {
            UserId: userId
          },
          include: [
            {
              model: Song
            }
          ]
        })
        res.send(bookmarks)
      } catch (err) {
        res.status(500).send({
          error: 'error al tratar de obtener el bookmark'
        })
      }
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        res.status(400).send({
          error: 'Ya lo has puesto como favorito'
        })
      }
      const newBookmark = await Bookmark.create({
        UserId: userId,
        SongId: songId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'error al tratar de obtener el bookmark'
      })
    }
  },
  async deleteAll (req, res) {
    if (req.user) {
      try {
        const songId = req.params.songId
        await Bookmark.destroy({
          where: {
            SongId: songId
          }
        })
        res.send(songId)
      } catch (err) {
        console.log(err)
      }
    } else {
      res.status(500).send({
        error: 'error al tratar de borrar las bookmarks'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'no tienes acceso a este bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'error al tratar de obtener el bookmark'
      })
    }
  }
}
