import express from "express"
import { routes } from "./routes"
import cors from "cors"

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use(express.json())

app.use(routes)

app.listen(3333, () => console.log("server is running"))