import { compare } from "bcrypt"
import dayjs from "dayjs"
import { response } from "express"
import { sign } from "jsonwebtoken"
import { IClient } from "../../entities/IClient"
import { prisma } from "../../external/database/prismaClient"
import { LoginRepository } from "./LoginRepository"

interface PropsLoginUseCase {
  email: string
  password: string
}

interface IRefreshToken {
  userEmail: string
  expiresIn: string
}

export class LoginUseCase {
  async execute({email, password}:PropsLoginUseCase){
  
    const repo = new LoginRepository( prisma )

    const client: IClient = await repo.findEmailUser(email)
    console.log("client", client)
    const refreshToken: IRefreshToken = await repo.findEmailRefreshToken(email)

    if(!client){
      return response.status(400).json({error: 'Esse e-mail ou senha não existe'})
    }

    const confirmPassword = client.password
    const passwordMatch = await compare(password, confirmPassword!)

    if(!passwordMatch){
      return response.status(400).json({error: 'Esse e-mail ou senha não existe'})
    }

    const token = sign({
      user: {
          name: client.name,
          email: client.email,
      },
    }, "a1df64cba1f711410b6a4a86942971cb", {
        subject: client.id,
        expiresIn: "60s",

    } )

    if(!refreshToken){
      const expiresIn = dayjs().add(1, 'day').unix()
      const refreshToken: IRefreshToken = await repo.createRefreshToken(email, expiresIn)

      return ({token, refreshToken})
    }
  return ({token, refreshToken})
    
  }
}