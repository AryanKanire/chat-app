const mongoose = require("mongoose");

const converstionShema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }    
    ],
    message:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message',
            default:[],
        }
    ]

},{timestamps:true});

const converstion = mongoose.model("Conversation",converstionShema);

module.exports = converstion;