import { PrismaClient } from "@prisma/client";
import { IClient } from "../../entities/IClient";
import { IShowAllClientRepositorys } from "../../external/repository/Interfaces"

export class ShowAllClientRepository implements IShowAllClientRepositorys {
  constructor (private readonly prisma: PrismaClient){}
  
  async get (): Promise<any> {
    return await this.prisma.user.findMany()
  }
}