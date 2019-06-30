Primer etapa del proyecto:

Envio peticion http con axios  tipo [post] desde el ciente   a :
“http:localhost:8081/register”( las recibe mi servidor  desde la url apropiada  verifico que mis campos esten  correctamente escritos (tipos de  datos de  entrada,longitud minima y maxima , que no esixta email  que se trata de añadir)  si cualquiera de  estos campos no ese cumplen  mando un error , si todo va bien regreso el objeto ‘user’ añadido  nos sin antes añadirlo a mi base de  datos)
Envio peticion http con axios  tipo [post] desde el ciente a:  
“http:localhost:8081/login” ( obtengo los parametros de entrada del usuario(email,password) checo si el email  esta registardo en nuestra base de datos  si  sii  checo  si los passwords coinciden, en cada una de las condiciones si no se cumple regreso un error,si no hay error regreso el objecto user  que se a logado (lo verifico solo com postman))

nota : "añadi un dependencia que se utilzaráen la segunda parte del proyecto y no en esta (jsonwebtoken)"
