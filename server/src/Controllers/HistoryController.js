const { History, Song } = require('../models')
const _ = require('lodash')
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
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      res.send(_.uniqBy(histories, history => history.SongId))
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
        const userId = req.params.userId
        await History.destroy({
          where: {
            UserId: userId
          }
        })
        res.send(userId)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
