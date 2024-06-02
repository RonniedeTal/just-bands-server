const mongoose= require("mongoose");
//const Schema=require("mongoose")

const CommentSchema=new mongoose.Schema({
text:{
    type:String,   
},
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
band:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Band"
}

} 
,{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
)
const Comment=mongoose.model("Comment",CommentSchema);
module.exports=Comment



//*-------modify this structure of schema---