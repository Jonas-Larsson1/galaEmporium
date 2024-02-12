import mongoose from "mongoose"
import crypto from "crypto"

// behöver inte finnas dubbelt, ligger också i users i en annan branch
const salt = "örtSalt"
const getHash = (password) => {
  let hash = crypto.pbkdf2Sync(
    password, salt, 1000, 64, 'sha512'
    ).toString('hex')
  return hash 
}

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password_hash: String,
  club_id:  [{type: mongoose.Schema.Types.ObjectId, ref: "clubs"}]
})

const userModel = mongoose.model('users', userSchema)

export default function user(server) {

  server.get('/api/user', async (req, res) => {
    res.json(await userModel.find())
  })

  server.get('/api/login', async (req, res) => {
    if (req.session.user) {
      res.status(200).json({
        loggedIn: req.session.user
      })
    } else {
      res.status(200).json({
        loggedIn: false
      })
    }
  })

  server.post('/api/login', async(req, res) => {
    if (req.session.user) {
      res.status(409).json({
        message:  "There is already an user logged in"
      })
    } else {
      const user = await userModel.findOne({
        email: req.body.email,
        password_hash: getHash(req.body.password)
      })
      
      if (user) {
        req.session.user = user._id
        res.status(201).json({
          loggedIn: user._id
        })
      } else {
        res.status(404).json({
          message: "Invalid email or password"
        })
      }
    }
  })

  server.delete('/api/login', async(req, res) => {
    if (req.session.user) {
      req.session.destroy()
      res.status(200).json({
        message: "Succesfully logged out"
      })
    } else {
      res.status(404).json({
        message: "There is no user logged in"
      })
    }
  })

}