import { Request, Response } from "express";
import { CreateClientUseCase } from "../createClient/CreateClientUseCase";
import { RecoveryUserUseCase } from "./RecoveryUserUseCase";

export class RecoveryUserController{
  async handle(request: Request, response: Response){

    const recoveryUserUseCase = new RecoveryUserUseCase()

    const result = await recoveryUserUseCase.execute({
      request,
      response
    })
    console.log("aaaaaaaaaaaaaaaaaaa", result)
    return response.json(result)
  }
  
}