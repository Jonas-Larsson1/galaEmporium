import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
  event_id: {type: mongoose.Schema.Types.ObjectId, ref: "events"},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
  seats_reserved: Number, 
  paid: Boolean  
})

const bookingModel = mongoose.model('bookings', bookingSchema)

export default function booking(server) {

  server.get('/api/bookings', async (req, res) => {
    try {
      res.json(await bookingModel.find())
    } catch (error) {
      res.status(500).json({ message: "There was a problem fetching bookings from the server." })
    }
  })

  server.post('/api/bookings', async (req, res) => {
    try {
      if(req.session.user) {
        const newBooking = new bookingModel({
          event_id: req.body.event_id,
          user_id: req.session.user,
          seats_reserved: req.body.seats_reserved,
          paid: req.body.paid
        })
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
      } else {
        res.status(403).json({ messgae: "You need to be logged in!" });
      }
    } catch (error) {
      res.status(500).json({ message: "There was a problem adding the booking." });
    }
  })

}