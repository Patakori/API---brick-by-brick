import { PrismaClient } from "@prisma/client";
import { IClient } from "../../../entities/IClient";

interface ShowAllClientRepositorys {
  get:(reference: string) => Promise<any>
}

export class ShowAllClientRepository implements ShowAllClientRepositorys {
  constructor (private readonly prisma: PrismaClient){}
  
  async get (): Promise<any> {
    return await this.prisma.user.findMany()
  }
}