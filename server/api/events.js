import mongoose from "mongoose"
import { clubModel } from "./club.js"

const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  cost: Number,
  max_attendees: Number,
  club_id: {type: mongoose.Schema.Types.ObjectId, ref:"clubs"},
  img: {data: Buffer, type:String},
  tickets_left: Number
})

const eventModel = mongoose.model('events', eventSchema)

export default function event(server) {

  server.get('/api/event', async (req, res) => {
    res.json(await eventModel.find().populate("club_id"))
  })

  server.get('/api/event/:id', async (req, res) => {
    const events = await eventModel.findById(req.params.id).populate("club_id")
    res.json(events)
  })

  server.get('/api/clubEvents/:club_id', async (req, res) => {
    res.json(await eventModel.find({
      club_id: req.params.club_id
    }).populate("club_id"))
  })

  server.post('/api/event', async (req, res)=> {
    try {
      const club = await clubModel.findById(req.body.club_id)
      if (!club.owners.includes(req.session.user)) {
        return res.status(401).json({ message: "You are not a registered club owner." });
      } else { 
        const newEvent = new eventModel({
          name: req.body.name,
          description: req.body.description,
          date: req.body.date,
          cost:req.body.cost,
          max_attendees: req.body.max_attendees,
          club_id: req.body.club_id,
          img: req.body.img, 
        })
        const result = await newEvent.save()
        return res.status(200).json(result)
    }
    } catch(error){
        res.json({message: "404: Could not post event", error})
    }
    
  })

  server.put('/api/event/:id', async (req, res) => {
    try {
      const eventToUpdate = await eventModel.findById(req.params.id).populate('club_id');
      if (!eventToUpdate.club_id.owners.includes(req.session.user)) {
        return res.status(401).json({ message: "You are not a registered club owner." });
      } else {
        const updatedEvent = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({
          old: eventToUpdate,
          new: updatedEvent
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Event was not updated" });
    }
  })
}