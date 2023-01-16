import { PrismaClient } from "@prisma/client";


export class DeleteClientRepository{
  constructor (private readonly prisma: PrismaClient){}

  async delete(email:string): Promise<any> {
    await this.prisma.user.delete({
      where:{
        email
      }
    })  
  }
}