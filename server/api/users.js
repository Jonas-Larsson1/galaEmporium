import mongoose from "mongoose"
import crypto from "crypto"

// borde alla crypto saker ligga i en egen fil?
const salt = "örtSalt";
const getHash = (password) => {
  let hash = crypto.pbkdf2Sync(
    password, salt, 1000, 64, 'sha512'
    ).toString('hex')
  return hash 
}
// ---------------------------------

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password_hash: String,
  club_id:  [{type: Schema.Types.ObjectId, ref: "clubs"}]
})

const userModel = mongoose.model('users', userSchema)

export default function user(server) {

  server.get('/api/user', async (req, res) => {
    res.json(await userModel.find())
  })

}