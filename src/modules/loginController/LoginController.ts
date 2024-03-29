import { compare } from "bcrypt";
import { Request, Response } from "express";
import { IClient } from "../../entities/IClient";
import { prisma } from "../../external/database/prismaClient";
import { LoginRepository } from "./LoginRepository";
import { LoginUseCase } from "./LoginUseCase";

interface ILoginController {
  email: string
  password: string
}

export class LoginController{
  async handle (request: Request, response: Response){
    try{
      const { email, password }:ILoginController = request.body;

      const useCase = new LoginUseCase()
  
      const result = await useCase.execute({
        email, 
        password,
      })
     
  
      return response.json(result)
    }catch(error){
      console.log("error login")
   }

  }
}