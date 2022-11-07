import { PrismaClient } from "@prisma/client";
import { IClient } from "../../../entities/IClient";

interface CreateClientRepositorys {
  add:(client:IClient) => Promise<void>
  get:(reference: string) => Promise<IClient>
}

export class CreateClientRepository implements CreateClientRepositorys {
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
          name: client.username,
          email: client.email,
          password: client.password,
      }
  })
  }
  
}