import mongoose from "mongoose"

const aboutSchema = mongoose.Schema({
  title: String,
  text: String
})

const aboutModel = mongoose.model('abouts', aboutSchema)

export default function about(server) {

  server.get('/api/about', async (req, res) => {
    res.json(await aboutModel.find())
  })

}