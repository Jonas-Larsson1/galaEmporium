import mongoose from "mongoose"

const clubSchema = mongoose.Schema({
  title: String,
  text: String
})

const clubModel = mongoose.model('clubs', clubSchema)

export default function club(server) {

  server.get('/api/club', async (req, res) => {
    res.json(await clubModel.find())
  })



}