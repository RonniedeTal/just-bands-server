const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username:{
      type:String,
      required:[true, "User is required."]
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    favorite:{
      type:[Schema.Types.ObjectId],//ask----
      ref:"Band"
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }, 
    //add img profile --------------------
    /*profileImage:{
      type:String,
      default:""
    },*/

  },
 
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
