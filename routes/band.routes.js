//Band Routes Here
const router = require("express").Router();

const Band = require("../models/Bands.model.js");
//localhost:5005/api/band/---------create a new band----------
router.post("/", (req, res, next) => {
    console.log(req.body);
  Band.create({
    name: req.body.name,
    genre: req.body.genre,
    country: req.body.country,
    crew:req.body.crew
  })
    .then(() => {
      console.log("band created");
      res.sendStatus(201).json({message:"band created "})
    })
    .catch((error) => {
     next(error) ;
    });
});
//localhost:5005/api/band---------list of the bands---------------
router.get("/",async(req,res,next)=>{
try {
  const response=await Band.find(req.query)
  res.status(200).json(response)
} catch (error) {
  next (error)
  
}

})

router.get("/random", async(req, res, next)=>{
  console.log();//-----Take care of this
  try {
    const randomBand= Math.floor(Math.random()*data.length)
const randomb=data[randomBand]
res.status(200).json(randomb)
  } catch (error) {
    next(error)
  }


}) //------------- need to check this route, to get a random band--

//localhost:5005/api/band/:bandId-----------get a band by id-----------------
router.get("/:bandId",async(req, res, next)=>{
  try {
    const response=await Band.findById(req.params.bandId).populate("user")
    res.status(200).json(response)
    
  } catch (error) {
    next(error)
  }
})
//localhost:5005/api/band/:bandId----to update the band
router.put("/:bandId", async(req,res,next)=>{
  try {
    const response=await Band.findByIdAndUpdate(req.params.bandId,{
      name: req.body.name,
    genre: req.body.genre,
    country: req.body.country,
    },{new:true})
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})


//seems i need a patch route--- TAKE CARE OF THIS
module.exports = router;
