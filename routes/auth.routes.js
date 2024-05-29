const User = require("../models/User.model");

const router=require("express").Router()
const bcrypt=require("bcryptjs")
const jwt= require("jsonwebtoken")
const {isTokenValid}=require("../middlewares/auth.middlewares")
//authentications routes

//POST/"api/auth/signup"=>recieve data(email username,password) from user and create it in db
router.post("/signup", async(req, res, next)=>{

console.log(req.body);
const{email, username, password}=req.body

//server validations

//all spaces must be an obligtaion
if(!email||!username||!password){
    res.status(400).json({errormessage:"All fields are required"})
    return
}
//valid email
const emailRegex=/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
if(emailRegex.test(email)===false){
    res.status(400).json({errormessage:"Invalid email"})
    return
}
//password must be secure
const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
if(passwordRegex.test(password)===false){
    res.status(400).json({errormessage:"Password needs more than 8 characters, a capital letter and any other character"})
    return
}

try {
    //email has to be unique
const foundUser = await User.findOne({email:email})
console.log(foundUser);
if(foundUser){
    res.status(400).json({errormessage:"User allready registered with this email"})
}

    const salt=await bcrypt.genSalt(12)
    const hashPassword=await bcrypt.hash(password, salt)

    //create the document of user on db
    await User.create({
        email:email,
        username:username,
        password:hashPassword//password
    })
    res.sendStatus(201)
res.json("everything right")
} catch (error) {
    next(error)
    
}



})

//POST/"api/auth/login"=>recieve credentials from the user(email, password).we'll send the token
router.post("/login", async(req,res,next)=>{

    console.log(req.body);
    const {email, password}=req.body


    //recieving information
    if (!email||!password){
        res.status(400).json({errormessage: "all fields are obligatory"})
    }
  try {

    //user exists
    const foundUser = await User.findOne({email:email})
    console.log(foundUser);
    if (!foundUser){
        res.status(400).json({errormessage: "This user doesn't exists"})
        return//just to stop the route
    }
    //password  must be the correct

    const isPasswordCorrect=await bcrypt.compare(password, foundUser.password)
    console.log(isPasswordCorrect);
    if(isPasswordCorrect===false){
        res.status(400).json({errormessage:"Not valid password"})
        return
    }

    //creating Token AND send it to user
    const payload={
        _id: foundUser._id,
        email:foundUser.email
        //all the static information must be right here
    }
    const authToken=jwt.sign(
        payload,//token content
        process.env.TOKEN_SECRET,//token config
        {algorithm:"HS256", expiresIn:"7d"}
    )

    res.status(200).json({authToken:authToken})
    
  } catch (error) {
    next(error)
    
  }

})

//Get"api/auth/verify"=>recieve the token and validate it
router.get("/verify",isTokenValid, (req, res, next)=>{

    console.log((req.payload));
    res.status(200).json({payload:req.payload})

})

module.exports=router
