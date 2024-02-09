import mongoose from "mongoose"

const loginSchema = mongoose.Schema({
    email: String, 
    password: String, 
}) 

const loginModel = mongoose.model('logins', loginSchema)

export default function login(server) {

server.get('/api/login', async(req, res) => {
res.json(await loginModel.find())
})

}