import { PrismaClient } from "@prisma/client";

export class UpdateClientRepository{
  constructor (private readonly prisma: PrismaClient){}

  async update (email: string, name:string): Promise<any> {
   return await this.prisma.user.update({
      where:{
          email
      },
      data:{
         name
      }
  })
  }

}