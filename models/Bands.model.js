const mongoose= require("mongoose");
const Schema=require("mongoose")
const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  genre: {
    type: String,
    enum: [
      "Rock",
      "Metal",
      "Alternative",
      "Grunge",
      "Hardcore",
      "DeathMetal",///mas de 1 artist class
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
                    //----------------owner
  },
  country: {
    type: String,
  },
  crew: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});
const Band = mongoose.model("Band", BandSchema);
module.exports = Band;
