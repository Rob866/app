const { History, Song } = require('../models')

module.exports = {
  async index (req, res) {
    const userId = req.user.id
    try {
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      })
      res.send(histories)
    } catch (err) {
      res.status(500).send({
        error: 'error al tratar de obtener  el historial'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body
      const newHistoryItem = await History.create({
        UserId: userId,
        SongId: songId
      })
      res.send(newHistoryItem)
    } catch (err) {
      res.status(500).send({
        error: 'error al tratar de obtener el bookmark'
      })
    }
  },
  async delete (req, res) {
    if (req.user) {
      try {
        const songId = req.params.songId
        await History.destroy({
          where: {
            SongId: songId
          }
        })
        res.send(songId)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
