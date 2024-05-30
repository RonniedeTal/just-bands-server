const {Schema, model}=require("mongoose")
const CommentSchema=new Schema({
text:{
    type:String,
    review:Number,
    username:String
}
})
const Comment=model("Comment",CommentSchema);
module.exports=Comment