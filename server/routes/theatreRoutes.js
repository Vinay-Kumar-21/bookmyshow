const router=require('express').Router();
const Theatre=require("../models/theatreModel");
const authMiddelware=require("../middlewares/authMiddleware");
const { response, request } = require('express');


//create
router.post("/add-theatre",authMiddelware,async(request,response)=>{
    try{
        const newTheatre=new Theatre(request.body);
        await newTheatre.save();
    }catch(error){
        response.status(500).send({
            success:false,
            message:"Something went wrong,Please try again after sometime!"
        })
    }
})


//Read
router.post("/get-all-theatres-by-owner",authMiddelware,async(request,response)=>{
    try{
        const theatres=await Theatre.find({owner:request.body.owner});
        response.status(200).send({
            success:true,
            message:"Theatres fetched successfully",
            data:theatres
        })
    }catch(error){
        response.status(500).send({
            success:false,
            message:"Something went wrong, Please try again!!"
        })
    }
})

router.get("/get-all-theatres",authMiddelware,async(_,response)=>{
    try{
        const theatres=await Theatre.find();
        response.status(200).send({
            success:true,
            message:"Theatres fetched successfully",
            data:theatres
        })
    }catch(error){
        response.status(500).send({
            success:false,
            message:"Something went wrong, Please try again!!"
        })
    }
})

//update
router.put("/update-theatre",authMiddelware,async(request,response)=>{
    try{
        await Theatre.findByIdAndUpdate(request.body.theatreId, request.body);
        response.send({
            success: true,
            message: "Theatre Updated Successfully",
        })
    }catch(error){
        response.status(500).send({
            success:false,
            message:error.message
        })
    }
})


// Delete
router.delete("/delete-theatre", authMiddelware, async (request, response) => {
    try {
        await Theatre.findByIdAndDelete(request.query.theatreId);
        response.send({
            success: true,
            message: "Theatre Deleted Successfully",
        });
    } catch (err) {
        response.status(500).send({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;