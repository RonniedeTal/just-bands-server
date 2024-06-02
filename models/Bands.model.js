const mongoose= require("mongoose");
const Schema=require("mongoose")
const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  genre: {
    type: [String], //gives an array of...
    enum: [
      "Rock",
      "Metal",
      "Alternative",
      "Grunge",
      "Hardcore",
      "DeathMetal",
      "Psycodellic",
      "Progressive",
      "Punk",
      "Grindcore",
      "Cumbia",
      "Thrash"
    ],
    required: [true, "Choose a Genre "],
  },
  owner:{
        type:Schema.Types.ObjectId,
        ref:"User",      //----------------added just for one owner of the band
  },
  country: {
    type: String,
  },
  crew: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`    
  timestamps: true
}
);
const Band = mongoose.model("Band", BandSchema);
module.exports = Band;
