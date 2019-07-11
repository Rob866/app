Tercer  etapa del proyecto:
En mi backend  creo  mi endpoint  para la petición 'http put' la cual recibe  el id de la cancion  como parametro
y mi objeto cancion.Encuentro el id que hace match con el objeto(usaurio) correspondiente  una vez que tengo  la referncia
del objeto en mi base de daatos lo remplazo con el objeto que recibo de mi  cliente. 

Creo el end point get , este recibe  el id de la cancion que  se quiere mostrar, checo en mi base datos el id si hace match
con alguno de ellos  regreso el objeto(usuario) para que se despliegue sus datos

En mi cliente añado e boton edit dentro del template cancion,cuando le doy click  le mando el parametro id  al componente edit en mi url y cuando este compoenente se carga hago una peticion http get a mi backend mandango el id del usuario
al cual quiero que se muestren sus datos lo recibo y lo cargo a mi objeto usuario de mi conponente.
en este componente edit  em mi botton 'guardar' hago une peticion http put  a mi  backend  mandandole el id  de usuario que a sido
modificado.

En mi  cliente dentro de mi componete canciones añado un componente 'busqueda' cuando se detecta  un cambio
en  mi campo busqueda, mando el contenido de mi busqueda por mi url como query.Como tanto el 
hijo como el padre tiene la misma  url,mi componente canciones(componente padre) lo  lo lee y manda una peticion http get 'el mismo endpoint que despliega las canciones', mandando el dato del campo de mi busqueda con un retraso de 700 msegundos para que este se envie con una mayor cantidad de letras y  no mando  peticiones http cada vez que el usuario tecla una letra dentro de mi campo busqueda.

En mi backend en el mismo endpoint para desplegar las canciones recibo la peticion de busqueda
con la diferencia  de que en esta petición mando mi busqueda como parametro.Si mi endpoint 
no lee nada como parametro de entrada hago mi  busqueda normal, si este detecta este parametro
hago un filtro y regreso todas las canciones que en algunos campos específicos coinciden con mi dato de busqueda.      


