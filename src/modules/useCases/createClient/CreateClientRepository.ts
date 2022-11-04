import {IClient} from "../../../entities/IClient"

export interface CreateClientRepository {
  add:(client:IClient) => Promise<void>
  get:(reference: string) => Promise<IClient>
}