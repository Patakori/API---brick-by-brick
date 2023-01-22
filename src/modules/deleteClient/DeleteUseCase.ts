import {prisma} from "../../external/database/prismaClient"
import { DeleteClientRepository } from "./DeleteRepository"

interface PropsDeleteClient {
  email: string
}

export class DeleteClientUseCase {
  async delete({email}:PropsDeleteClient){

    const repo = new DeleteClientRepository(prisma)

    const deleted = await repo.delete(email) 

    return (deleted)
  }
}