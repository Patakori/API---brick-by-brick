
import { Request, Response } from "express"
import { CreateClientUseCase } from "./CreateClientUseCase"

interface IRequest{
  email: string,
  usename: string,
  password:string
}


export class CreateClientController{
  async handle(request:Request, response: Response){
    try{
      const {email, username, password}:any = request.body

      const createClientUseCase = new CreateClientUseCase()
  
  
      const result = await createClientUseCase.execute({
        name: username,
        email,
        password,
      })
      
  
      return response.status(201).json(result)

    }catch(error: any){
      return response.status(400).json({
        message: error.message
      })
  }
}}