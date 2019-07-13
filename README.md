En mi  backend  creo el modelo Bookmark al cuál lo relaciono con el model User y Song  en base al método associate de mi modelo Bookmark, al leer todos mis modelos(User, Song,Bookmark)
el modelo que tenga el método associate (en este caso Bookmark) se  le pasa la referecia de mi
base de  datos,con esa referencia puedo accesar a mi modelo User y Song  y asi hago la  relación.
Para realizar  una instancia de este modelo solo solamente le paso un objeto { UserId: data, SongId: data }

En mi componente Song agrego dos botones  setBookmark y removeBookmark
y  cuando se carga mi componente Song ,pido una peticion http index  pasando mi userId mi songId para recibir la instancia bookmark
en caso de recibirla  visualizo mi boton removeBookark(ya que el id del usuario y el id de la cancion se encunatran
instaciados en mi booomark) en caso que no , no regeso nada y se habilita setBookmark
En  caso de  dar clik a setBookmark hago una peticion  http post mandando mi userId y songId  para crear una instancia
bookmark  y la regreso desde mi backend a mi  cliente la  recibo y la cargo  a mi instancia  bookmark 
En caso de darl click removeBookmark mando un petion http delete para borrar la instancia 
bookmark de mi backend y pongo a null mi instancia bookmark.

Para visualizar mi lista de bookmarks para un usuario en específico cuando  se carga mi componente songs hago una peticion http index  pero ahora solo manado  el userId, tomando ese user id puedo mandar un array de  todas las canciones que estan relacionadas en mi 
bookmarks
