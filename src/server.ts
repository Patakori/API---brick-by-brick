
import express from 'express';
import { v4 as uuidv4 } from "uuid";
import cors from "cors"

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
function verifyExistAccount(request:any, response:any, next:any){
    const {email}:any = request.body

    const customer = customerDB.find(customer => customer.email === email)

    if(customer){
        return response.status(400).json({error: 'Esse e-mail já existe'})
    }
//para disponibilizar a função para as rotas
    request.customer = customer

    return next()
}

//Rota para criar a conta
app.post("/account", verifyExistAccount, (request, response)=>{
    const { email, name, password }:any = request.body;

    customerDB.push({
        id:uuidv4(),
        name,
        email,
        password
    });

    return response.status(201).send()
})

//Rota para ver a conta
app.get("/show", (request:any,response:any)=> {

    return response.json(customerDB)
})

//Rota pra login, verificador de senha
app.get("/login", (request:any,response:any)=> {
    const { email, password }:any = request.body;

    const dataUser = customerDB.find( data => data.email.includes(email))
    const confirmPasswortd = dataUser?.password === password

    console.log(dataUser)
    console.log(confirmPasswortd)

    return response.json()
})

//Rota pra atualização do nome
app.put("/account/:email", (request,response)=> {
    //Params pra conseguir pesquisar na rota do put
    const { email } = request.params;
    //Nome que vem do frontend
    const { name } = request.body;

    //Procurando o objeto que contem o perfil do usuário pelo e-mail
    const findEmail = customerDB.find((data) => data.email === email)

    //Como e-mail pode ser nulo, então só vai executar se for verdadeiro
    if(findEmail){
        
        //Pegando o nome do banco deixando ele igual ao nome que veio do frontend assim atualizando
        findEmail.name = name
    }
    
    return response.json(customerDB);
});


//Porta da aplicação Localjost:3333
app.listen(3333, () => console.log('Server is running!'));