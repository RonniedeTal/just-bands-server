
const router=require("express").Router()
const User=require("../models/User.model")
const {isTokenValid}=require("../middlewares/auth.middlewares")

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

router.patch("/:bandId/favorite",isTokenValid,async(req,res,next)=>{
    try {
        const response =await User.findById(req.payload._id)
       
        console.log(response);
        if(!response.favorite.includes(req.params.bandId)){
            await User.findByIdAndUpdate(req.payload._id, {$addToSet:{favorite:req.params.bandId}})
        }else{ await User.findByIdAndUpdate(req.payload._id,{$pull:{
            favorite:req.params.bandId }})
     
    }
    res.json({message:"added to favorite"})
    } catch (error) {
        next(error)
    }
})




module.exports=router