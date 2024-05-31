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

})
const Comment=mongoose.model("Comment",CommentSchema);
module.exports=Comment



//*-------modify this structure of schema---