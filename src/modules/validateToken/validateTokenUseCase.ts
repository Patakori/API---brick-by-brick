import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ValidateTokenUseCaseProps{
  request: Request
  response: Response
}

export class ValidateTokenUseCase{
  async execute({request, response}:ValidateTokenUseCaseProps){


    const authHeader = request.headers.authorization

    if(!authHeader){
        return response.status(401).json({error: 'Token não existe'})
    }

    const [,token] = authHeader.split(" ")
    console.log(token)

    try{
        const validate = verify(token,"a1df64cba1f711410b6a4a86942971cb")
        if(validate){
            return response.status(201).send("foii")
        }
        
    } catch(err){
        return response.status(401).send("Token inválido")
    }
  }
}