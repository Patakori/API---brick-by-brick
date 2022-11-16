import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response){
    const {refreshToken} = request.body
    console.log("PAMONHAAAA", refreshToken)

    const refreshTokenUSeCase = new RefreshTokenUseCase()

    const resultRefreshToken = await refreshTokenUSeCase.execute({
      refreshToken,
    })
    console.log("REFRRESHHHHHHHH", resultRefreshToken)
    return response.status(201).json(resultRefreshToken)

  }
}