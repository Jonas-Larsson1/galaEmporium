import mongoose from "mongoose"


export default function login(server) {

server.get('/api/login', async(req, res) => {
res.json(await loginModel.find())
})

} 
