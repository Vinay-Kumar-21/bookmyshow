const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    ticketPrice:{
        typr:Number,
        required:true,
    },
    totalSeats:{
        type:Number,
        required:true,
    },
    bookedSeats:{
        type:Array,
        required:true,
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
        required:true,
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"theatres",
        required:true,
    }
});

module.exports = mongoose.model("shows", showSchema);