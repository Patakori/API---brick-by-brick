import { Request, Response } from "express";
import { ValidateTokenUseCase } from "./validateTokenUseCase";

export class ValidateTokenController{
  async handle(request:Request, response:Response){
    try {
      const useCase = new ValidateTokenUseCase()

      const verifyToken = await useCase.execute({
        request,
        response
      })

      if(verifyToken){
        return response.sendStatus(200)
      }

      
    } catch (error) {
      console.log("Erro Validate Token")
    }

  }
}