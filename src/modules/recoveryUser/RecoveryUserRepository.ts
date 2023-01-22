import { PrismaClient } from "@prisma/client";

export class RecoveryUserRepository{
  constructor (private readonly prisma: PrismaClient){}

  async findEmail(email:string):Promise<any>{
    try {
      return await this.prisma?.user?.findUnique({
        where:{
          email: email
      }
      })
    } catch (error) {
      
    }
  }
}