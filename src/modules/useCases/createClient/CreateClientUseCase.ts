import {prisma} from "../../../database/prismaClient"
import { IClient } from "../../../entities/IClient"
import {hash, compare} from "bcrypt"
import { PrismaClientRepository } from "../../../repository/PrismaClientRepository"

export class CreateClientUseCase {

  async execute({password, username, email}:IClient){

  const passwordHash = await hash(password, 8)
  const repo = new PrismaClientRepository(prisma)
  const verifyEmail = await repo.get(email)

  const clientObject:IClient = {
      username: username,
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