import {prisma} from "../../external/database/prismaClient"
import { UpdateClientRepository } from "./UpdateClientRepository"

interface PropsUpdateClientUseCase{
  name: string
  email:string
}

export class UpdateClientUseCase{
  async execute({name, email}:PropsUpdateClientUseCase){

    const repo = new UpdateClientRepository(prisma)
    const toBeUpdated = await repo.update(email, name)

    if(toBeUpdated){
        
      toBeUpdated.name = name
  }

    const userUpdated = toBeUpdated


    return userUpdated
  }
}