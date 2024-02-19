import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
  event_id: {type: mongoose.Schema.Types.ObjectId, ref: "events"},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
  seats_reserved: Number, 
  paid: Boolean  
})

const bookingModel = mongoose.model('bookings', bookingSchema)

export default function booking(server) {

  server.get('/api/booking', async (req, res) => {
    // res.json(await bookingModel.find())
    try {
      const bookings = await bookingModel.find().populate(["event_id", "user_id"]);
      res.json(bookings);
    } catch (error){
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  server.get('/api/booking/user/:user_id', async(req,res) => {
    try{
      const booking = await bookingModel.find({user_id: req.params.user_id}).populate(["event_id", "user_id"]);
      res.json(booking)
    } catch {
      console.error("Gick inte att fetcha booking via id")
      res.status(500).json({error: "Internal server error"})
    }
  })


  // server.get('/api/booking/:id', async (req,res)=> {
  //   const event = await bookingModel.findById(req.params.id).populate("event_id")
  //   res.json(event)
  // })

  
}