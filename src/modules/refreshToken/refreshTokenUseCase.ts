import { response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "../../external/database/prismaClient";
import { RefreshTokenRepository } from "./refreshTokenRepository";

interface RefreshTokenProps{
  refreshToken: string
}

export class RefreshTokenUseCase{
  async execute({refreshToken}:RefreshTokenProps){

    const repo = new RefreshTokenRepository(prisma)
    console.log("itxaaaaaaaaaaaaaaa", refreshToken)

    const findRefreshToken = await repo.findRedreshToken(refreshToken)

    if(!findRefreshToken){
      return ({error: 'Refresh Token Inválido'})
    }

    const findUserWithRefreshToken = await repo.findEmailUser(findRefreshToken?.userEmail)

    const token = sign({
      user: {
          name: findUserWithRefreshToken?.name,
          email: findUserWithRefreshToken?.email,
      },
  }, "a1df64cba1f711410b6a4a86942971cb", {
      subject: findRefreshToken?.userEmail,
      expiresIn: "60s",
      
  } )

  return (token)

  }
}