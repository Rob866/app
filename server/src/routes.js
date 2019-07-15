const AutentificacionController = require('./Controllers/AutentificacionController')
const SongsController = require('./Controllers/SongsController')
const AutentificacionControllerPolicy = require('./policies/autentificacionControllerPolicy')
const BookmarksController = require('./Controllers/BookmarksController')
const HistoryController = require('./Controllers/HistoryController')
const estaAutentificado= require('./policies/estaAutentificado')

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
    app.put('/songs/:songId',
    SongsController.put)
    app.delete('/songs/:songId',
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
    app.delete('/bookmarks/all/:songId',
    estaAutentificado,
    BookmarksController.deleteAll)
    
    app.get('/history',
    estaAutentificado,
    HistoryController.index)
    app.post('/history',
    estaAutentificado,
    HistoryController.post)
    app.delete('/history/:songId',
    estaAutentificado,
    HistoryController.delete)

}