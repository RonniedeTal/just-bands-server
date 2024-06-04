const mongoose= require("mongoose");
const Schema=require("mongoose")
const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  description:{
 type:String
  },
  profileImage:{
    type:String,
    default:""
  },
  genre: {
    type: [String], //gives an array of...
    enum: [
      "Stoner",
      "Metal",
      "Alternative",
      "Grunge",
      "Hardcore",
      "DeathMetal",
      "Psycodellic",
      "Progressive",
      "Punk",
      "Grindcore",
      "Others",
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
  instagramUrl: {
    type: String,
    default: "",
  },
  spotifyUrl: {
    type: String,
    default: "",
  },
},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`    
  timestamps: true
}
);
const Band = mongoose.model("Band", BandSchema);
module.exports = Band;
