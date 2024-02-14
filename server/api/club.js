import mongoose from "mongoose"

const clubSchema = mongoose.Schema({
  title: String,
  text: String,
  image: String
})

const clubModel = mongoose.model('clubs', clubSchema)

export default function club(server) {

  server.get('/api/club', async (req, res) => {
    res.json(await clubModel.find())
  })

  server.put('/api/club/:id', async(req, res) => {
    try{
      const updatedData = {}
      if (req.body.title){
        updatedData.title = req.body.title
      } 
      if (req.body.text) {
        updatedData.text = req.body.text
      }
      if (req.body.image) {
        updatedData.image = req.body.image
      }

      if (Object.keys(updatedData).length > 0) {
        const updatedClub = await clubModel.findByIdAndUpdate(req.params.id, updatedData, {new: true})

        if(!updatedClub){
          return res.status(404).json({message: "Klubb hittades inte"})
        }
        res.json(updatedClub)
      } else {
        res.status(400).json({message: "Ingen information skickades"})
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ett fel uppstod på servern vid uppdatering"})
    }
  })

}