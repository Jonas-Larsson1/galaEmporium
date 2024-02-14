import mongoose from "mongoose"

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
    }))
  })

  server.post('/api/event', async (req, res)=> {
    try{
    const newEvent = new eventModel({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      cost:req.body.cost,
      max_attendees: req.body.max_attendees,
      club_id: req.body.club_id,
      img: req.body.img, //Kommer inte att laddas upp som bild... 
      tickets_left:req.body.tickets_left 
    })
    const result = await newEvent.save()
    res.json(result)
    } catch(error){
        res.json({message: "404: Could not post event", error})
    }
    
  })

  server.put('/api/event/:id', async(req, res)=> {
    try{
    const id = req.params._id
    const updatedEvent = req.body
    const data = await eventModel.findOneAndUpdate(id, updatedEvent, {
        new:true
    })
    res.json(data)
  }catch{
      res.json("404: Data was not updated")
  }
  })

}