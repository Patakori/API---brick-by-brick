import { Router } from 'express'
import { CreateClientController } from './modules/useCases/createClient/CreateClientController'
import { ShowAllClientController } from './modules/useCases/showAllClient/showAllClientController'

const routes = Router()

const createClientController = new CreateClientController()
const showAllClientController = new ShowAllClientController()

routes.post("/account/", createClientController.handle)
routes.get("/show", showAllClientController.handle)

export { routes }