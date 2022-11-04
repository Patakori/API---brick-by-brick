import { Router } from 'express'
import { CreateClientController } from './modules/useCases/createClient/CreateClientController'

const routes = Router()

const createClienController = new CreateClientController()

routes.post("/account/", createClienController.handle)

export { routes }