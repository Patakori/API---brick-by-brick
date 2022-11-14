import { PrismaClient } from "@prisma/client";
import { ILoginRepositorys } from "../../external/repository/Interfaces";

export class LoginRepository implements ILoginRepositorys {
  constructor (private readonly prisma: PrismaClient){}

  async findEmailUser(email: string):Promise<any>{
    return await this.prisma.user.findUnique({
      where:{
        email
      }
    })
  }
  
  async findEmailRefreshToken(email: string):Promise<any>{
    return await this.prisma.refreshToken.findUnique({
      where:{
          userEmail: email,
      }
    })
  }

  async createRefreshToken(email: string, expiresIn:number):Promise<any>{
    return await this.prisma.refreshToken.create({
      data:{
          userEmail: email,
          expiresIn: expiresIn,
      }
  })
  }
  
  
}