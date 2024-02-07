import mongoose from "mongoose"

const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  message: String
})

const contactModel = mongoose.model('contacts', contactSchema)

export default function contact(server) {

  server.get('/api/contact', async (req, res) => {
    res.json(await contactModel.find())
  })

  server.post('/api/contact', async (req, res) => {
    const contact = new contactModel(req.body)
    const result = await contact.save()
    res.json(result)

  })

}