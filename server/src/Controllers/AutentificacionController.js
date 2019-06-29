const { User } = require('../models')

module.exports = {

  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'este email ya esta en uso.'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'la informacion es incorrecta'
        })
      }
      const isPassValid = password === user.password
      if (!isPassValid) {
        return res.status(403).send({
          error: 'la informacion es incorrecta'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Un error a ocurrido tratandose de logasre'
      })
    }
  }
}
