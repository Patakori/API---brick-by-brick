
import express, { response } from 'express';
import { v4 as uuidv4 } from "uuid";

import {hash, compare} from "bcrypt"
import { sign, verify } from 'jsonwebtoken';
import { prisma } from './external/database/prismaClient';
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode";

// const app = express()


// app.use(express.json());

//Middleware

// Middleware Errors
async function verifyErrors(error: any, request:any, response:any, next:any){
    console.log("aqui no miderros", error)
    response.sendStatus(500)
}

// Middleware Verifica se a conta já existe
async function verifyExistAccount(request:any, response:any, next:any){
    const {email}:any = request.body

    // const customer = customerDB.find(customer => customer.email === email)

    const emailExist = await prisma.user.findUnique({
        where:{
            email
        }
    })

    console.log(emailExist)

    if(emailExist){
        return response.status(400).json({error: 'Esse e-mail já existe'})
    }
//para disponibilizar a função para as rotas
    request.emailExist = emailExist

    return next()
}

//middleware para ver se o token é valido
// async function validateToken(request:any, response:any, next:any){
//     const authHeader = request.headers.authorization

//     if(!authHeader){
//         return response.status(401).json({error: 'Token não existe'})
//     }

//     const [,token] = authHeader.split(" ")
//     console.log(token)

//     try{
//         const {sub} = verify(token,"a1df64cba1f711410b6a4a86942971cb")
//         return next()
//     } catch(err){
//         return response.status(401).json({error: 'Token inválido'})
//     }
// }
    
// Verificando se o token existente no cookie é válido
// app.get("/validateToken", async (request:any, response:any)=>{
//     const authHeader = request.headers.authorization

//     if(!authHeader){
//         return response.status(401).json({error: 'Token não existe'})
//     }

//     const [,token] = authHeader.split(" ")
//     console.log(token)

//     try{
//         const validate = verify(token,"a1df64cba1f711410b6a4a86942971cb")
//         if(validate){
//             return response.status(201).send("foii")
//         }
        
//     } catch(err){
//         return response.status(401).send("Token inválido")
//     }
// })

//rota para carregar novamento os dados do user
// app.get("/recoveryUser", async (request:any,response:any)=> {
//     const authHeader = request.headers.authorization
//     const [,token] = authHeader.split(" ")
//     const decoded:any = jwt_decode(token);
//     const emailecoded = decoded.user.email
//     const dataUser = await prisma.user.findUnique({
//         where:{
//             email: emailecoded
//         }
//     })

//     const user = {
//         name: dataUser?.name,
//         email: dataUser?.email,
//     }

//     return response.json(user)
// })


//Rota para criar a conta - ok
// app.post("/account", verifyExistAccount, async (request, response)=>{
//     const { email, name, password }:any = request.body;

//     const passwordHash = await hash(password, 8)

//     const user = await prisma.user.create({
//         data:{
//             name,
//             email,
//             password: passwordHash
//         }
//     })
//     return response.status(201).send(user)
// })

//Rota para ver a conta - ok
// app.get("/show", async (request:any,response:any)=> {

//     const showAll = await prisma.user.findMany({})

//     return response.json(showAll)
// })

//Rota pra login, verificador de senha
// app.post("/login", async (request:any ,response:any)=> {
//     const { email, password }:any = request.body;

//     const dataUser = await prisma.user.findUnique({
//         where:{
//             email
//         }
//     })

//     if(!dataUser){
//         return response.status(400).json({error: 'Esse e-mail ou senha não existe'})
//     }
//     const confirmPassword = dataUser?.password
//     const passwordMatch = await compare(password, confirmPassword!)

//     if(!passwordMatch){
//         return response.status(400).json({error: 'Esse e-mail ou senha não existe'})
//     }

//     const token = sign({
//         user: {
//             name: dataUser?.name,
//             email: dataUser?.email,
//         },
//     }, "a1df64cba1f711410b6a4a86942971cb", {
//         subject: dataUser?.id,
//         expiresIn: "60s",
        
//     } )

//     const refreshTokenUser = await prisma.refreshToken.findUnique({
//         where:{
//             userEmail: email,
//         }
//     })

//     if(!refreshTokenUser){
//         const expiresIn = dayjs().add(1, 'day').unix()

//         const refreshToken = await prisma.refreshToken.create({
//             data:{
//                 userEmail: dataUser.email,
//                 expiresIn: expiresIn
//             }
//         })
//         return response.status(201).json({token, refreshToken})
//     }

//     return response.status(201).json({token, refreshTokenUser})

// })

//Refresh token
// app.post("/refreshToken", async (request:any ,response:any)=> {
//     const {refresh_token} = request.body
//     console.log("refresh_token",refresh_token)

//     const refreshTokenUser = await prisma.refreshToken.findUnique({
//         where:{
//             userEmail: refresh_token,
//         }
//     })

//     if(!refreshTokenUser){
//         return response.status(400).json({error: 'Refresh Token Inválido'})
//     }
    
//     const dataUser = await prisma.user.findUnique({
//         where:{
//             email: refreshTokenUser?.userEmail,
//         }
//     })

//     const token = sign({
//         user: {
//             name: dataUser?.name,
//             email: dataUser?.email,
//         },
//     }, "a1df64cba1f711410b6a4a86942971cb", {
//         subject: refreshTokenUser?.userEmail,
//         expiresIn: "60s",
        
//     } )

//     return response.status(201).json({token})

// })

//Rota pra atualização do nome
// app.put("/account/:email", validateToken, async (request,response)=> {
//     //Params pra conseguir pesquisar na rota do put
//     const { email } = request.params;
//     //Nome que vem do frontend
//     const { name } = request.body;

//     //Procurando o objeto que contem o perfil do usuário pelo e-mail
//     const dataUSer = await prisma.user.update({
//         where:{
//             email
//         },
//         data:{
//            name 
//         }
//     })

//     //Como e-mail pode ser nulo, então só vai executar se for verdadeiro
//     if(dataUSer){
        
//         //Pegando o nome do banco deixando ele igual ao nome que veio do frontend assim atualizando
//         dataUSer.name = name
//     }
//     return response.status(201).json(dataUSer)
//     // return response.json(customerDB);
// });

//Rota para deletar uma conta
// app.delete("/account/:email", async (request, response)=>{
//     const {email} = request.params

//     //deletando o usuário
//     const dataUSer = await prisma.user.delete({
//         where:{
//             email
//         },
//     })

    
//     return response.status(201).json(dataUSer)
// })

//Porta da aplicação Localjost:3333
// app.listen(3333, () => console.log('Server is running!'));