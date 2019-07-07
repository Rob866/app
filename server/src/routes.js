const AutentificacionController = require('./Controllers/AutentificacionController')
const SongsController = require('./Controllers/SongsController')
const AutentificacionControllerPolicy = require('./policies/autentificacionControllerPolicy')


module.exports = (app) => {
    app.post('/register', 
    AutentificacionControllerPolicy.register,
    AutentificacionController.register),
    app.post('/login',
    AutentificacionController.login),
    app.post('/songs',
    SongsController.post)
    app.get('/songs',
    SongsController.index),
    app.get('/songs/:songId',
    SongsController.show)
}