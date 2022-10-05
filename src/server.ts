
import express, { response } from 'express';
import { v4 as uuidv4 } from "uuid";
import cors from "cors"
import {hash, compare} from "bcrypt"
import { sign } from 'jsonwebtoken';
import { prisma } from './database/prismaClient';


interface IPropsDB { id: string; name: string; email: string; password:string }[]

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use(express.json());

//Banco de dados

const customerDB: IPropsDB[]  = [];

//Middleware

//Verifica se a conta já existe
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



//Rota para criar a conta
app.post("/account", verifyExistAccount, async (request, response)=>{
    const { email, name, password }:any = request.body;

    const passwordHash = await hash(password, 8)

    // customerDB.push({
    //     id:uuidv4(),
    //     name,
    //     email,
    //     password: passwordHash
    // });

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: passwordHash
        }
    })
    return response.status(201).send(user)
})

//Rota para ver a conta
app.get("/show", async (request:any,response:any)=> {

    const showAll = await prisma.user.findMany({})

    return response.json(showAll)
})

//Rota pra login, verificador de senha
app.post("/login", async (request:any ,response:any)=> {
    const { email, password }:any = request.body;

    // const dataUser = customerDB.find( data => data.email.includes(email))
    const dataUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!dataUser){
        return response.status(400).json({error: 'Esse e-mail ou senha não existe'})
    }
    const confirmPassword = dataUser?.password
    const passwordMatch = await compare(password, confirmPassword!)

    if(!passwordMatch){
        return response.status(400).json({error: 'Esse e-mail ou senha não existe'})
    }

    const token = sign({
        user: {
            name: dataUser?.name,
            email: dataUser?.email,
        },
    }, "a1df64cba1f711410b6a4a86942971cb", {
        subject: dataUser?.id,
        expiresIn: "1d",
        
    } )


    return response.status(201).json(token)

})

//?????????
app.get("/user", async (request:any ,response:any)=> {
    const { auth }:any = request.headers.authorization;

    const [bearer, token] = auth.split("")

    console.log("tokennnnnnn", token)

    // const dataUser = customerDB.find( data => data.email.includes(email))
    
    // const userReturn = { 
    //     user: {
    //         name: dataUser?.name,
    //         email: dataUser?.email,
    //     },
    // }

    // if(userReturn){
    //     return response.status(201).json(userReturn)
    // } else {
    //     return response.status(400).json({error: 'ERRORRRRRRRRRRRR'})
    // }

    
})

//Rota pra atualização do nome
app.put("/account/:email", async (request,response)=> {
    //Params pra conseguir pesquisar na rota do put
    const { email } = request.params;
    //Nome que vem do frontend
    const { name } = request.body;

    //Procurando o objeto que contem o perfil do usuário pelo e-mail
    // const findEmail = customerDB.find((data) => data.email === email)
    const dataUSer = await prisma.user.update({
        where:{
            email
        },
        data:{
           name 
        }
    })

    //Como e-mail pode ser nulo, então só vai executar se for verdadeiro
    if(dataUSer){
        
        //Pegando o nome do banco deixando ele igual ao nome que veio do frontend assim atualizando
        dataUSer.name = name
    }
    return response.status(201).json(dataUSer)
    // return response.json(customerDB);
});

//Rota para deletar uma conta
app.delete("/account/:email", async (request, response)=>{
    const {email} = request.params

    //descobrindo o index do usuário no array que possui todos os usuários
    // const indexUser = customerDB.map((user:any)=>user.email).indexOf(email)

    //deletando o usuário
    const dataUSer = await prisma.user.delete({
        where:{
            email
        },
    })
    // customerDB.splice(indexUser, 1)

    
    return response.status(201).json(dataUSer)
})

//Porta da aplicação Localjost:3333
app.listen(3333, () => console.log('Server is running!'));