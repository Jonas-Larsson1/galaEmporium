import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"
import session from "express-session"

const server = express()
const port = 3001

server.use(session({
  secret: 'var_hemliga_tangent',
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: false} 
}))

server.use(express.json())
server.use(express.static('../client'))

mongoose.connect("mongodb+srv://jonas1:Bc1q24H5dHUWSfPj@myfirstcluster.kltqcx2.mongodb.net/galaEmporium")

apiRegister(server)

server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`)
})