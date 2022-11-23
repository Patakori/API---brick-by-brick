import { Router } from 'express'
import { CreateClientController } from './modules/createClient/CreateClientController'
import { LoginController } from './modules/LoginController.ts/LoginController'
import { RecoveryUserController } from './modules/recoveryUser/RecoveryUserController'
import { RefreshTokenController } from './modules/refreshToken/refreshTokenController'
import { ShowAllClientController } from './modules/showAllClient/showAllClientController'
import { UpdateClientController } from './modules/UpdateClient/UpdateClientController'
import { ValidateTokenController } from './modules/validateToken/validateTokenController'

const routes = Router()

const createClientController = new CreateClientController()
const showAllClientController = new ShowAllClientController()
const loginController = new LoginController()
const validateTokenController = new ValidateTokenController()
const recoveryUserController = new RecoveryUserController()
const refreshTokenController = new RefreshTokenController()
const updateClientController = new UpdateClientController() 

routes.post("/account", createClientController.handle)
routes.get("/show", showAllClientController.handle)
routes.post("/login", loginController.handle)
routes.get("/validateToken", validateTokenController.handle )
routes.get("/recoveryUser", recoveryUserController.handle )
routes.post("/refreshToken", refreshTokenController.handle )
routes.put("/account/:email", updateClientController.handle)

export { routes }