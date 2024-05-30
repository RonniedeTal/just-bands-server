//Band Routes Here
const mongoose=require("mongoose")

const Band=require("../models/Bands.model.js")

app.post("/band",(req,res,next)=>{

    Band.create({
        name:"TAL",
        genre:"Grunge",
        Country:"Spain",
        

    })
    .then(()=>{
        console.log("band created");
    }).catch((error)=>{
        console.log(error);
    })
})