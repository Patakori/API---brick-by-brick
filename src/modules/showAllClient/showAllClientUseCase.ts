import { ShowAllClientRepository } from "./showAllClientRepository";
import { prisma } from "../../external/database/prismaClient"

export class ShowAllClientUseCase {
  async execute(){
    const repo = new ShowAllClientRepository(prisma)

    const resultAll = await repo.get()
    return resultAll
  }
}