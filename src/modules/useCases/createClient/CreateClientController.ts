
import { Request, Response } from "express"
import { CreateClientUseCase } from "./CreateClientUseCase"


export class CreateClientController{
  async handle(request:Request, response: Response){
    const {username, email, password}:any = request.body

    const createClientUseCase = new CreateClientUseCase()


    const result = await createClientUseCase.execute({
      username,
      email,
      password,
    })

    return response.json(result)
  }
}