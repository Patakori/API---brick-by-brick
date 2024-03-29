import {prisma} from "../../external/database/prismaClient"
import { IClient } from "../../entities/IClient"
import {hash, compare} from "bcrypt"
import { CreateClientRepository } from "./CreateClientRepository"

export class CreateClientUseCase {

  async execute({password, name, email}:IClient){

  const passwordHash = await hash(password, 8)
  const repo = new CreateClientRepository(prisma)
  const verifyEmail = await repo.get(email)

  const clientObject:IClient = {
      name: name,
      email: email,
      password: passwordHash,
  }

  if(verifyEmail){
    throw new Error('Esse e-mail já existe')
  }

  const createUser = await repo.add(clientObject)

  return createUser

  }
}