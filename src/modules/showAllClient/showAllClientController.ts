import { ShowAllClientUseCase } from "./showAllClientUseCase";
import { Request, Response } from "express"

export class ShowAllClientController{

  async handle(request:Request, response: Response){
    try {
      
    const showAllClientUseCase = new ShowAllClientUseCase()

    const resultsAll = await showAllClientUseCase.execute()

    return response.json(resultsAll)
    } catch (error) {
      console.log("error show all client")
    }
  }
}