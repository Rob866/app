Segunda etapa del proyecto:

* Añadi cifrado en el password  /librerias utilizadas: bluebird bcrypt-nodejs/
* cada vez que me registro o logeo desde mi cliente mando las credenciales a mi backend  si todo marcha bien este me regresa el objeto usuario(el que se registro) y su token correspondiente   /libreria utilizada jsonwebtoken/
* lo recibo de mi cliente y lo guardo en el state de Vuex y en base al token leo "su estado" dependiendo de este despliego o no  "REGISTER y lOGIN" 
* en mi backend creo el modelo "canción" recibo peticiones https  get(regreso todas las canciones) get(recibo el id de la cancion y regreso el objeto cancion correpondiente) y post( para crear un cancion(instancia) )
* en mi frontend hago dos  peticiones http get para recibir todas las canciones y otra para recibir una canción específica mandado
el id correspondiente y un post para crear una nueva cancion.





