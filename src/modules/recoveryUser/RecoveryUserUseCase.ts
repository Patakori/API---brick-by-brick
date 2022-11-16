import { prisma } from "../../external/database/prismaClient"
import { Request, Response } from "express";
import jwt_decode from "jwt-decode";
import { RecoveryUserRepository } from "./RecoveryUserRepository";

interface ValidateTokenUseCaseProps{
  request: Request
  response: Response
}
export class RecoveryUserUseCase {
  async execute({ request, response }:ValidateTokenUseCaseProps){
    const authHeader = request.headers.authorization
    const repo = new RecoveryUserRepository(prisma)


    if(authHeader){
      const [,token] = authHeader.split(" ")
      const decoded:any = jwt_decode(token);
      console.log("token", token)
      console.log("decoded", decoded)
      const emailecoded = decoded.user.email   
      console.log("decoded", emailecoded)
      const resultUser = await repo.findEmail(emailecoded)

      const user = {
        name: resultUser?.name,
        email: resultUser?.email,
      }
      console.log("userrrrrrrrrrr", user)
      return (user)
    
    }
    

  }
}