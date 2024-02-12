import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  cost: Number,
  max_attendees: Number,
  club_id: {type: mongoose.Schema.Types.ObjectId, ref: "clubs"},
  downloadURL: {type:String} 
})

const eventModel = mongoose.model('events', eventSchema)

export default function event(server) {

  server.get('/api/event', async (req, res) => {
    res.json(await eventModel.find())
  })

  server.get('/api/event/:club_id', async (req, res) => {
    res.json(await eventModel.find({
      club_id: req.params.club_id
    }))
  })
}