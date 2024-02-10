import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  cost: Number,
  max_attendees: Number,
  club_id: {type: Schema.Types.ObjectId, ref: "clubs"},
  downloadURL: {type:String} 
})

const eventModel = mongoose.model('events', eventSchema)

export default function event(server) {

  server.get('/api/event', async (req, res) => {
    res.json(await eventModel.find().populate("club_id"))
  })

  server.post('/api/event', async (req, res)=> {
    try{
    const newEvent = new eventModel(req.body)
    const result = newEvent.save()
    res.json(result)
    } catch(error){
        res.json({message: "404: Could not post event", error})
    }
    
  })

  server.put('/api/event/:id', async(req, res)=> {
    const id = req.params.club_id
    const updatedEvent = req.body
    const data = await eventModel.findOneAndUpdate(id, updatedEvent, {
        new:true
    })
    res.json(data)
  })

}