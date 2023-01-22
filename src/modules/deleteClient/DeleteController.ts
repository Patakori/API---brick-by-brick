import { Request, Response } from "express";
import { DeleteClientUseCase } from "./DeleteUseCase";

export class DeleteController{
  async handle(request: Request, response: Response){
    try {
      const { email }:any = request.params

      const deleteClient = new DeleteClientUseCase()
  
      const result = await deleteClient.delete({
        email: email
      })
      return response.json(result)
    } catch (error) {
      console.log("error delete controller")
    }
  }
}