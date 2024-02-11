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
    res.json(await eventModel.find())
  })

  server.post('/api/event', async (req, res)=> {
    try{
    const newEvent = new eventModel({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      max_attendees: req.body.max_attendees,
      club_id: req.body.club_id,
      downloadURL: req.body.downloadURL})
    const result = await newEvent.save()
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