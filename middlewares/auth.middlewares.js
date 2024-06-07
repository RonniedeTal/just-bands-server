const jwt= require("jsonwebtoken")

function isTokenValid(req,res,next){
    try {
        console.log(req.headers.authorization);
        const token=req.headers.authorization.split(" ")[1]
        console.log(token);
         //validate token
        const payload=jwt.verify(token, process.env.TOKEN_SECRET)
        //validate token
        //return the payload
        console.log(payload);
       
       req.payload=payload//pass this from middleware to route

        //if token is validate allow acces
            next()
        
       } catch (error) {
        //if the token isn't validate, send an error
         res.status(401).json({errormessage: "Token is not valid"})
       }
       
}

    
//}
module.exports={
    isTokenValid,
   
}