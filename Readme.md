# Endpoint for Front-end sin Deploy

## Post User: http://localhost:3001/singUp/
###    Necesita por body:
###    name: string,
###    password: string,
###    cellPhone: int,
###    email: string,
###    profilePict: archivo de imagen a convertir

## Post Service: http://localhost:3001/service/ Requiere Token
###   Necesita por body:
###    name: string,
###    typeService: tipo del TypeService,
###    price: int,
###    description: TEXT,
###    files: archivo de imagen a convertir,
###    idUser: Enviado por el JsonWebToken
###    Para trabajar sin el idUser, si no tiene los repositorios actualizados hacer lo siguiente:
###    Fede tiene las lineas comentadas para trabajar de esta forma
###    En caso de tener el Back al dia, comentar las siguiente lineas:
###    Comentar las lineas 25, 27 a 30, 43 del archivo createService.handler.js

## Get allService: http://localhost:3001/allService
###    Envia un array de objetos con las siguientes propiedades:
###    id: int, Id del servicio,
###    name: string,
###    price: int,
###    files: string, url de la foto del servicio,
###    typeService: string

## Get allTypeService: http://localhost:3001/allTypeService/
###    Envia un array de objetos con las siguientes propiedades:
###    id: int, id del TypeService,
###    type: string, tipo del servicio(Alerta esto es solamente por que envio directamente toda las opciones de la tabla TypeService)

## Get serviceByName: http://localhost:3001/nameService/?name=
###    Necesita el query:
###    name: string, no tiene que ser completo
###    Envia un array de objetos con las siguientes propiedades:
###    id: int, id del servicio,
###    name: string,
###    price: int,
###    description: TEXT,
###    files: string, url de imagen,
###    user_id: int

## Get serviceById: http://localhost:3001/serviceById/:id
###    Necesita el id por param
###    Devuelve un objeto con las siguiente propiedades:
###    id: int,
###    name: string,
###    price: int,
###    Description: TEXT,
###    files: string, url de foto,
###    type: string, tipo de TypeService

## Get UserById: http://localhost:3001/getUserById/:id
###    Necesita el id por param
###    Devuelve un objeto con las siguientes propiedades:
###    id: int,
###    name: string,
###    password: string,
###    cellPhone: int,
###    email: string,
###    profilePict: string, url de foto,

## Get ServicesByUserId: http://localhost:3001/getServiceByUser/:id
###    Necesita el id por param
###    Devuelve un array de objetos que contiene las siguientes propiedades:
###    id: int,
###    name: string,
###    description: TEXT,
###    files: string

## Put Update Service: http://localhost:3001/editService/ Requiere token
###    Necesita por body:
###    id: id del servicio a editar
###    name: string,
###    typeService: type del TypeService,
###    price: int,
###    description: TEXT,
###    files: archivo de imagen a convertir

## Put Update User: http://localhost:3001/editUser Requiere token
###    Necesita por body:
###    id: Enviado por token
###    name: string
###    email: enviado por token
###    password: string
###    cellphone: int
###    profilePict: archivo de imagen a convertir

## Post SignIn: http://localhost:3001/singIn
###    Necesita por body:
###    email: string,
###    password: string