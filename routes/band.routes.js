//Band Routes Here
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js");
const Band = require("../models/Bands.model.js");
//localhost:5005/api/band/---------create a new band----------

router.post("/", isTokenValid, async (req, res, next) => {
  //router.post("/", (req, res, next) => {
  console.log(req.body);
  try {
    await Band.create({
      //Band.create({
      name: req.body.name,
      genre: req.body.genre,
      country: req.body.country,
      crew: req.body.crew,
      owner: req.payload._id, //-----comes from...authtoken friday
    });
    res.status(201).json({ message: "band created " });
  } catch (error) {
    next(error);
  }
});
//localhost:5005/api/band---------list of the bands---------------
router.get("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const response = await Band.find(req.query)
      .populate("crew", "username")
      .populate("owner");
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    next(error);
  }
});

//------------- localhost:5005/api/band/random------ get a random band
router.get("/random", async (req, res, next) => {
  try {
    const response = await Band.find();
    const randomIndex = Math.floor(Math.random() * response.length);
    const randomBand = response[randomIndex];
    res.json(randomBand);
  } catch (error) {
    next(error);
  }
});

//localhost:5005/api/band/:bandId-----------get a band by id-----------------
router.get("/:bandId", async (req, res, next) => {
  try {
    const response = await Band.findById(req.params.bandId)//populate() breaks the code
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
//localhost:5005/api/band/:bandId----to update the band
router.put("/:bandId", async (req, res, next) => {
  try {
    const response = await Band.findByIdAndUpdate(
      req.params.bandId,
      {
        name: req.body.name,
        genre: req.body.genre,
        country: req.body.country,
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//seems i need a patch route--- TAKE CARE OF THIS
module.exports = router;
