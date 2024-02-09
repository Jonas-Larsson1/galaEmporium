import mongoose from "mongoose"
import crypto from "crypto"



const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password_hash: String,
  club_id:  [{type: Schema.Types.ObjectId, ref: "clubs"}]
})
// [{ type: mongoose.Schema.Types.ObjectId, ref: "books" }]
const userModel = mongoose.model('users', userSchema)

export default function user(server) {

  server.get('/api/user', async (req, res) => {
    res.json(await userModel.find())
  })

}