const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//------------url routes------
const authRouter=require("./auth.routes")
router.use("/auth",authRouter)
const bandRouter=require("./band.routes")
router.use("/band", bandRouter)
const commentRouter=require("./comment.routes")
router.use("/comment",commentRouter)
const userRouter=require("./user.routes")
router.use("/user",userRouter)
module.exports = router;
