# Descripcion del Proyecto Asesoria-Profesional
## Este proyecto es el backend del Repositorio de FedeOrefici, Asesoria Profesional PF Henry Frontend. Por lo siguiente su función es dar la funcionalidad necesaria a este para poder realizar las tareas necesarias.
## Si bien este inicia con el fin de aprobar la etapa de labs de Henry en la seccion de Proyecto Final en cualquier momento los miembros de este equipo podemos coordinarnos para continuar avanzando en grupo, o forkear este repositorio para expandirlo por nuestra cuenta.
# ----------------------------------------------------------------------------------------------

# Endpoint for Front-end

## Post User: /singUp/
###    Necesita por body:
###    name: string,
###    password: string,
###    cellPhone: int,
###    email: string,
###    profilePict: archivo de imagen a convertir

## Post Service: /service/ Requiere Token
###   Necesita por body:
###    name: string,
###    typeService: tipo del TypeService,
###    price: int,
###    description: TEXT,
###    files: archivo de imagen a convertir,
###    idUser: Enviado por el JsonWebToken



## Get allService: /allService
###    Envia un array de objetos con las siguientes propiedades:
###    id: int, Id del servicio,
###    name: string,
###    price: int,
###    files: string, url de la foto del servicio,
###    typeService: string
###    isDeleted: Boolean
###    userIsDeleted: Boolean

## Get allTypeService: /allTypeService/
###    Envia un array de objetos con las siguientes propiedades:
###    id: int, id del TypeService,
###    type: string, tipo del servicio(Alerta esto es solamente por que envio directamente toda las opciones de la tabla TypeService)

## Get serviceByName: /nameService/?name=
###    Necesita el query:
###    name: string, no tiene que ser completo
###    Envia un array de objetos con las siguientes propiedades:
###    id: int, id del servicio,
###    name: string,
###    price: int,
###    description: TEXT,
###    files: string, url de imagen,
###    user_id: int

## Get serviceById: /serviceById/:id
###    Necesita el id por param
###    Devuelve un objeto con las siguiente propiedades:
###    id: int,
###    name: string,
###    price: int,
###    Description: TEXT,
###    files: string, url de foto,
###    type: string, tipo de TypeService

## Get UserById: /getUserById/
###    Necesita el token
###    Devuelve un objeto con las siguientes propiedades:
###    id: int,
###    name: string,
###    password: string,
###    cellPhone: int,
###    email: string,
###    profilePict: string, url de foto,

## Get ServicesByUser: /getServiceByUser/
###    Necesita el token
###    Devuelve un array de objetos que contiene las siguientes propiedades:
###    id: int,
###    name: string,
###    description: TEXT,
###    files: string

## Put Update Service: /editService/ Requiere token
###    Necesita por body:
###    id: id del servicio a editar
###    name: string,
###    typeService: type del TypeService,
###    price: int,
###    description: TEXT,
###    files: archivo de imagen a convertir

## Put Update User: /editUser Requiere token
###    Necesita por body:
###    id: Enviado por token
###    name: string
###    email: enviado por token
###    password: string
###    cellphone: int
###    profilePict: archivo de imagen a convertir

## Post SignIn: /singIn
###    Necesita por body:
###    email: string,
###    password: string

## Post Review: /review
###    Necesita por body:
###    "reviewDescription": string,
###    "idService": integer

## Get All Users info: /allUsers/
###    Necesita token y isAdmin = true
###    Devuelve todos los usuario en un array de objectos que tiene las siguiente propiedades:
###    name: String
###    email: String
###    profilePict: String, url
###    isAdmin: Boolean
###    isSuperAdmin: Boolean
###    cantService: int, la cantidad de servicios que tiene el usuario
###    isDeleted: Boolean, si esta bajo borrado logico

## Put Manage Admin Privilages /changeAdmin/
###    Necesita token y isAdmin = true
###    Da o quita privilegios de admin al usuario, mediante el cambio del estado isAdmin
###    Devuelve el Usuario actualizado con su estado de isAdmin la primera entrada cambia el false a true, y la siguientes entradas invierten esta relacion

## Put Manage User Logical delete /deleteUser/
###    Necesita token y el id del usuario a eliminar
###    Elimina logicamente al usuario si quien lo creo es quien lo esta haciendo, mediante el cambio del estado isDeleted, tras realizar esto el usuario pierde el accceso al sitio
###    Devuelve el Usuario actualizado con su estado de isDeleted la primera entrada cambia el false a true, y la siguientes entradas invierten esta relacion

## Put Manage Service Logical delete /deleteService/
###    Necesita token y user_id igual al id del token
###    Elimina logicamente al servicio si quien lo creo es quien lo esta haciendo, mediante el cambio del estado isDeleted, tras realizar esto el usuario pierde el accceso al sitio
###    Devuelve el Usuario actualizado con su estado de isDeleted la primera entrada cambia el false a true, y la siguientes entradas invierten esta relacion

## Put Manage Service Logical Admin delete /deleteServiceAdmin/
###    Necesita token y ser un admin(isAdmin = true)
###    Elimina logicamente al servicio si quien lo esta haciendo es un admin, mediante el cambio del estado isDeleted, tras realizar esto el servicio no deberia deberia aparecer en el sitio(Terminar de aplicar)
###    Devuelve el servicio actualizado con su estado de isDeleted la primera entrada cambia el false a true, y la siguientes entradas invierten esta relacion

## Post Sign In Admin /signInAdmin/
###     Necesita email y password por body.
###     Si el usuario tratando de conectarse, existe, no esta borrado logicamente y es admin devuelve un token de un usuario con permisos de admin.
###     De vuelve un token de un usuario admin.

## Get All Services Admin /AllServiceAdmin/
###    Necesita token
###    Devuelve todos los servicios y su estado respecto al borrado logico.