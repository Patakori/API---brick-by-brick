import { Request, Response } from "express";
import { DeleteClientUseCase } from "./DeleteUseCase";

export class DeleteController{
  async handle(request: Request, response: Response){
    const { email }:any = request.params


    const deleteClient = new DeleteClientUseCase()

    const result = await deleteClient.delete({
      email
    })
    
    return response.sendStatus(200).json(result)
  }
}