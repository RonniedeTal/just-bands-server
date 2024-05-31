
const router=require("express").Router()
const User=require("../models/User.model")


//------------create an user--------
//localhost:5005/api/user--------i guess...---is working!necessary dntknw!!
router.post("/",(req,res,next)=>{
    try {
        User.create({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})
//---------------get user by id
//localhost:5005/api/user/:userId---------
router.get("/:userId",async(req,res,next)=>{
   try {
     const response=await User.findById(req.params.userId)
    res.status(200).json(response)
} catch (error) {
    next(error)
}
})





module.exports=router