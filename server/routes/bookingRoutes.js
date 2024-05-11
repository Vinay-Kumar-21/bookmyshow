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

        const paymentIntent=await stripe.paymentIntents.create({
            amount:amount,
            currency:"usd",
            customer:customer.id,
            payment_method_types: ['card'],
            receipt_email:token.email,
            description:"Token has been assigned to the movie!"
        })

        const transactionId=paymentIntent.id;
          // const charge = await stripe.charges.create({
        //     amount: amount,
        //     currency: "usd",
        //     customer: customer.id,
        //     receipt_email: token.email,
        //     description: "Token has been assigned to the movie!"
        // });

        response.send({
            success:true,
            message:"payment successful! Ticket(s) booked!",
            data:transactionId,
        })

    }catch(err){
        response.send({
            success:false,
            message:err.message
        })
    }
})

router.post("/book-show",async(req,res)=>{
    try{
        console.log("request of body",req.body);
        const newBooking = new Booking(req.body);
        console.log("Bookings of show",newBooking)
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, { bookedSeats: updatedBookedSeats });
        res.send({
            success: true,
            message: 'New Booking done!',
            data: newBooking
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
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