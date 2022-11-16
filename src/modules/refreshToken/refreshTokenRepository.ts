import { PrismaClient } from "@prisma/client";

export class RefreshTokenRepository{
  constructor (private readonly prisma: PrismaClient){}

  async findRedreshToken(refresnToken:string){
    console.log("laaaaaaaaa", refresnToken)
    return await this.prisma.refreshToken.findUnique({
      where:{
          userEmail: refresnToken,
      }
    })
  }

  async findEmailUser(refresnToken: string){
    return await this.prisma.user.findUnique({
      where:{
        email: refresnToken
      }
    })
  }
}