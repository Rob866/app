const AutentificacionController = require('./Controllers/AutentificacionController')
const AutentificacionControllerPolicy = require('./policies/autentificacionControllerPolicy')

module.exports = (app) => {
    app.post('/register', 
    AutentificacionControllerPolicy.register,
    AutentificacionController.register),
    app.post('/login',
    AutentificacionController.login)
}