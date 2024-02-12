import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
  event_id: {type: Schema.Types.ObjectId, ref: "events"},
  user_id: {type: Schema.Types.ObjectId, ref: "users"},
  seats_reserved: Number, 
  paid: Boolean  
})

const bookingModel = mongoose.model('bookings', bookingSchema)

export default function booking(server) {

  server.get('/api/booking', async (req, res) => {
    res.json(await bookingModel.find())
  })

}