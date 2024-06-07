const router = require("express").Router();
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");

//------------create an user--------
//localhost:5005/api/user--------i guess...---is working!necessary dntknw!!
router.post("/", (req, res, next) => {
  try {
    User.create({
      username: req.body.username,
      email: req.body.email, //--------------------remove and change

      password: req.body.password, //to a put---and create change to findbyid
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//----------------------update User by id-----------
router.put("/:userId", isTokenValid, async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        email: req.body.email, //--------------------remove and change
        favorite: req.body.favorite,
        password: req.body.password, //to a put---and create change to findbyid
      },
      { new: true }
    );
    res.sendStatus(200).json(response);
  } catch (error) {
    next(error);
  }
});

//---------------get user by id
//localhost:5005/api/user/:userId---------
router.get("/:userId", async (req, res, next) => {
  try {
    const response = await User.findById(req.params.userId).populate(
      "favorite",
      "name"
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
//--------------choose a favorite---------------
//----localhost:5005/api/user/:bandId/favorite---------
router.patch("/:bandId/favorite", isTokenValid, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);

    console.log(response);
    if (!response.favorite.includes(req.params.bandId)) {
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: { favorite: req.params.bandId },
      }); //{$addToSet:{favorite:{bandId:req.params.bandId,name:band.name}}})
    } else {
      await User.findByIdAndUpdate(req.payload._id, {
        $pull: {
          favorite: req.params.bandId,
        },
      });
    }
    res.json({ message: "added to favorite" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
