const mongoose=require("mongoose")
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
  country: {
    type: String,
  },
  crew: {
    type: [Schema.Types.ObjectId],
    ref: "username",
  },
});
const Band = mongoose.model("Band", BandSchema);
module.exports = Band;
