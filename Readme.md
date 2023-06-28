# Endpoint for Front-end sin Deploy

## Post User: http://localhost:3001/singUp/
###    Necesita por body:
###    name: string,
###    password: string,
###    cellPhone: int,
###    email: string,
###    profilePict: archivo de imagen a convertir

## Post Service: http://localhost:3001/service/ 
###   Necesita por body:
###    name: string,
###    typeService: type del TypeService,
###    price: int,
###    description: TEXT,
###    files: archivo de imagen a convertir
###    idUser: id del usuario que crea el servicio

## Get allService: http://localhost:3001/allService

## Get allTypeService: http://localhost:3001/allTypeService/
###
## Get serviceByName: http://localhost:3001/nameService/?name=
###    Necesita el query:
###    name: string

## Get serviceById: http://localhost:3001/serviceById/1
###    Necesita el id por param

## Put Update Service: http://localhost:3001/editService/
###    Necesita por body:
###    id: id del servicio a editar
###    name: string,
###    typeService: type del TypeService,
###    price: int,
###    description: TEXT,
###    files: archivo de imagen a convertir

## Put Update User: http://localhost:3001/editUser
###    Necesita por body:
###    id: id  del usuario a editar
###    name: string
###    email: string
###    password: string
###    cellphone: int
###    profilePict: archivo de imagen a convertir

## Post SignIn: http://localhost:3001/singIn
###    Necesita por body:
###    email: string,
###    password: string