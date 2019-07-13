const { Bookmark, Song } = require('../models')

module.exports = {
  async index (req, res) {
    const { userId, songId } = req.query
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
      const { songId, userId } = req.body
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
  async delete (req, res) {
    try {
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findByPk(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'error al tratar de obtener el bookmark'
      })
    }
  }
}
