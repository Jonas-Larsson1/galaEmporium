import mongoose from "mongoose"

const clubSchema = mongoose.Schema({
  name: String,
  description: String,
  image: String
})

const clubModel = mongoose.model('clubs', clubSchema)

export default function club(server) {

  server.get('/api/club', async (req, res) => {
    res.json(await clubModel.find())
  })

  server.get('/api/club/:id', async (req, res) => {
    const club = await clubModel.findById(req.params.id)
    res.json(club)
  })

  server.put('/api/club/:id', async(req, res) => {
    try{
      const updatedData = {}
      if (req.body.name){
        updatedData.name = req.body.name
      } 
      if (req.body.description) {
        updatedData.description = req.body.description
      }
      if (req.body.image) {
        updatedData.image = req.body.image
      }

      if (Object.keys(updatedData).length > 0) {
        await clubModel.findByIdAndUpdate(req.params.id, updatedData, {new: false})
        const newUpdatedClub = await clubModel.findById(req.params.id)
        if(!newUpdatedClub){
          return res.status(404).json({message: "Klubb hittades inte"})
        }
        
        res.json(newUpdatedClub)

      } else {
        res.status(400).json({message: "Ingen information skickades"})
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ett fel uppstod på servern vid uppdatering"})
    }
  })
  
}