const AutentificacionController = require('./Controllers/AutentificacionController')
const SongsController = require('./Controllers/SongsController')
const AutentificacionControllerPolicy = require('./policies/autentificacionControllerPolicy')
const BookmarksController = require('./Controllers/BookmarksController')
const HistoryController = require('./Controllers/HistoryController')
const estaAutentificado= require('./policies/estaAutentificado')
const SongsUserController = require('./Controllers/SongsUserController')

module.exports = (app) => {
    app.post('/register', 
    AutentificacionControllerPolicy.register,
    AutentificacionController.register),
    app.post('/login',
    AutentificacionController.login),

    app.get('/user/songs',
    estaAutentificado,
    SongsUserController.index) 
    app.post('/songs',
    estaAutentificado,
    SongsController.post)
    app.get('/songs',
    SongsController.index),
    app.get('/songs/:songId',
    SongsController.show)
    app.put('/songs/:songId',
    estaAutentificado,
    SongsController.put)
    app.delete('/songs/:songId',
    estaAutentificado,
    SongsController.delete)
    
    app.get('/bookmarks',
    estaAutentificado,
    BookmarksController.index)
    app.post('/bookmarks',
    estaAutentificado,
    BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId',
    estaAutentificado,
    BookmarksController.delete)
    app.delete('/bookmarks/all/:userId',
    estaAutentificado,
    BookmarksController.deleteAll)
    
    app.get('/history',
    estaAutentificado,
    HistoryController.index)
    app.post('/history',
    estaAutentificado,
    HistoryController.post)
    app.delete('/history/:userId',
    estaAutentificado,
    HistoryController.delete)

}