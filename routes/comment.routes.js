const Comment=require("../models/Comment.model")
const router=require("express").Router()
const {isTokenValid}=require("../middlewares/auth.middlewares")

//localhost:5005/api/comment-----------post a comment
router.post("/",isTokenValid, async(req, res,next)=>{
console.log(req.body);
    try {
        
      await  Comment.create({
        text:req.body.text,
        user:req.payload._id,
        band:req.body.band
        
    })
    res.sendStatus(201)
    } catch (error) {
        next(error)
    }
   
})

router.get("/", isTokenValid,async(req,res,next)=>{
    console.log(req.params.commentId);
        try {
            const response=await Comment.find().populate("user","username").populate("band","name")//ask Jorge
            res.status(200).json(response)
        } catch (error) {
            next(error)
            
        }
    })

router.get("/:commentId", async(req,res,next)=>{
console.log(req.params.commentId);
    try {
        const response=await Comment.findById(req.params.commentId).populate("user","username").populate("band","name")//ask Jorge
        res.status(200).json(response)
    } catch (error) {
        next(error)
        
    }
})


//localhost:5005/api/comment/:comment-----to delete comments
router.delete("/:commentId",isTokenValid, async(req,res,next)=>{

        try {
            await Comment.findByIdAndDelete(req.params.commentId)
            res.sendStatus(202).json({message:"Commentary Deleted"})
        } catch (error) {
            next(error)
            
        }
})



module.exports=router