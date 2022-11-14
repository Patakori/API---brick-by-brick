import { IClient } from "../../entities/IClient"

export interface ICreateClientRepository{
  add:(client:IClient) => Promise<void>
  get:(reference: string) => Promise<IClient>
}

export interface IShowAllClientRepositorys {
  get:(reference: string) => Promise<any>
}

export interface ILoginRepositorys {
  findEmailUser:(email: string) => Promise<any>
  
  findEmailRefreshToken:(email: string) => Promise<any>

  createRefreshToken:(email: string, expiresIn:number) => Promise<any>


}

