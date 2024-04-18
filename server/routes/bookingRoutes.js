const authMiddleware=require('../middlewares/authMiddleware');
const Booking=require('../models/bookingModel');
const Show=require("../models/showModel");

const router=require('express').Router();
const stripe=require("stripe")(process.env.stripe_key);

router.post("/make-payment",authMiddleware,async(request,response)=>{
    try{
        const {token,amount}=request.body;
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        });

        const charge=await stripe.charges.create({
            amount,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.email,
            description:"Payment for booking tickets"
        })

        const transactionId=charge.id;
        // const paymentIntent = await stripe.paymentIntents.create({
        //   amount: Number(req.body.amount),
        //   currency: "INR",
        // });

        // const transactionId = paymentIntent.client_secret;

        res.send({
            success:true,
            message:"payment successful!",
            data:transactionId,
        })

    }catch(err){
        response.send({
            success:false,
            message:err.message
        })
    }
})

router.post("/book-show",authMiddleware,async(req,res)=>{
    try{
        //save booking
        const newBooking=new Booking(req.body);
        await newBooking.save();

        const show=await show.findById(req.body.show);
        //update seats
        await Show.findByIdAndUpdate(req.body.show,{
            bookedSeats:[...show.bookedSeats,...req.body.seats]
        });

        res.send({
            success:true,
            message:"Show booked successfully",
            data:newBooking
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

router.get("/get-bookings/",authMiddleware,async(req,res)=>{
    try{
        const bookings=await Booking.find({user:req.body.userId})
        .populate("show")
        .populate({
            path:"show",
            populate:{
                path:"movie",
                model:"movies"
            }
        })
        .populate("user")
        .populate({
            path:"show",
            populate:{
                path:"theatre",
                model:"theatres"
            }
        });

        res.send({
            success:true,
            message:"Bookings fetched successfully",
            data:bookings,
        })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

module.exports=router;