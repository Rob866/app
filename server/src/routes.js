const AutentificacionController = require('./Controllers/AutentificacionController')
const SongsController = require('./Controllers/SongsController')
const AutentificacionControllerPolicy = require('./policies/autentificacionControllerPolicy')
const BookmarksController = require('./Controllers/BookmarksController')

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

    app.get('/bookmarks',
    BookmarksController.index)
    app.post('/bookmarks',
    BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId',
    BookmarksController.delete)

}