import { PrismaClient } from "@prisma/client";
import { IClient } from "../entities/IClient";
import { CreateClientRepository } from "../modules/useCases/createClient/CreateClientRepository";


export class PrismaClientRepository implements CreateClientRepository {
  constructor (private readonly prisma: PrismaClient){}

  async add (client: IClient): Promise<void> {
    await this.prisma.user.create({
      data:{
          name: client.username,
          email: client.email,
          password: client.password,
      }
  })
  }

  async get (reference: string): Promise<any> {
     await this.prisma.user.findUnique({
      where:{
        email: reference
      },
  })
  }
  
}