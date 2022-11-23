import { Request, Response } from "express";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

export class UpdateClientController{
  async handle(request: Request, response: Response){
    const { email } = request.params;
    const { name } = request.body;

    const updateClientUsecase = new UpdateClientUseCase()

    const result = await updateClientUsecase.execute({
      email,
      name
    })

    return response.json(result)
  }
}