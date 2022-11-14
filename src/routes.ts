import { Router } from 'express'
import { CreateClientController } from './modules/createClient/CreateClientController'
import { LoginController } from './modules/LoginController.ts/LoginController'
import { ShowAllClientController } from './modules/showAllClient/showAllClientController'
import { ValidateTokenController } from './modules/validateToken/validateTokenController'

const routes = Router()

const createClientController = new CreateClientController()
const showAllClientController = new ShowAllClientController()
const loginController = new LoginController()
const validateTokenController = new ValidateTokenController()

routes.post("/account", createClientController.handle)
routes.get("/show", showAllClientController.handle)
routes.post("/login", loginController.handle)
routes.get("/validateToken", validateTokenController.handle )

export { routes }