import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
  event_id: {type: mongoose.Schema.Types.ObjectId, ref: "events"},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
  seats_reserved: Number,
  total_price: Number, 
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


  server.post('/api/bookings', async (req, res) => {
    try {
      if(req.session.user) {
        const newBooking = new bookingModel({
          event_id: req.body.event_id,
          user_id: req.session.user,
          seats_reserved: req.body.amount,
          total_price: req.body.totalPrice,
          paid: false
        })
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
      } else {
        res.status(403).json({ message: "You need to be logged in!" });
      }
    } catch (error) {
      res.status(500).json({ message: "There was a problem adding the booking." });
    }
  })

  
}