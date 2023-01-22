import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response){
    try {
      const {refreshToken} = request.body


      const refreshTokenUSeCase = new RefreshTokenUseCase()
  
      const resultRefreshToken = await refreshTokenUSeCase.execute({
        refreshToken,
      })
  
      return response.status(201).json(resultRefreshToken)
    } catch (error) {
      console.log("error refreshToken")
    }

  }
}