import { Request, Response } from "express";
import { ValidateTokenUseCase } from "./validateTokenUseCase";

export class ValidateTokenController{
  async handle(request:Request, response:Response){
    console.log("handle")
    try {
      const useCase = new ValidateTokenUseCase()

      console.log("Vai sabado", useCase)

      const verifyToken = await useCase.execute({
        request,
        response
      })
      console.log("Vai caralho", verifyToken)

      return response.sendStatus(200)
    } catch (error) {
      console.log("Erro Validate Token")
    }

  }
}