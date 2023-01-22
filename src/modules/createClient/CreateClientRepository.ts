import { PrismaClient } from "@prisma/client";
import { IClient } from "../../entities/IClient";
import { ICreateClientRepository } from "../../external/repository/Interfaces"

export class CreateClientRepository implements ICreateClientRepository {
  constructor (private readonly prisma: PrismaClient){}

  async get (reference: string): Promise<any> {
    return await this.prisma.user.findUnique({
     where:{
       email: reference
     },
 })
 }

  async add (client: IClient): Promise<any> {
   return await this.prisma.user.create({
      data:{
          name: client.name,
          email: client.email,
          password: client.password,
      }
  })
  }
  
}