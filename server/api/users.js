import mongoose from "mongoose"
import crypto from "crypto"

// borde alla crypto saker ligga i en egen fil?
const salt = "örtSalt"
const getHash = (password) => {
  let hash = crypto.pbkdf2Sync(
    password, salt, 1000, 64, 'sha512'
    ).toString('hex')
  return hash 
}
// ---------------------------------

const isValidEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

// borde alla schemas ligga i egna filer i en 'models' mapp?
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password_hash: String,
  club_id:  [{type: mongoose.Schema.Types.ObjectId, ref: "clubs"}]
})
// ---------------------------------

const userModel = mongoose.model('users', userSchema)

export default function user(server) {

// ----------- user -----------
  server.get('/api/user', async (req, res) => {
    res.json(await userModel.find())
  })

  server.get('/api/user/:id', async (req,res)=> {
    const user = await userModel.findById(req.params.id).populate("club_id")
    res.json(user)
  })

  server.post('/api/user', async (req, res) => {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
          message: "Missing required fields"
        })
      }

      if (!isValidEmail(req.body.email)) {
        return res.status(400).json({
          message: "Invalid email format"
        })
      } 
      
      const existingUser = await userModel.findOne({
        email: req.body.email
      })

      console.log(existingUser)

      if (existingUser) {
        return res.status(409).json({
          message: "Email already in use"
        })
      }

      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password_hash: getHash(req.body.password),
        club_id: req.body.club_id
      })

      const savedUser = await newUser.save()
      res.status(201).json({ user_id: savedUser._id })

    } catch (error) {
      res.status(500).json({
        message: "Error creating new user",
        error: error 
      })
    }
  })

  // --------- Login ----------
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