import { Request, Response } from "express";
import { ValidateTokenUseCase } from "./validateTokenUseCase";

export class ValidateTokenController{
  async handle(request:Request, response:Response){

    const useCase = new ValidateTokenUseCase()

    const verifyToken = useCase.execute({
      request,
      response
    })


    return response.json(verifyToken)

  }
}