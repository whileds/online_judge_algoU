const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true
    },

    constraints:{
        type:String
    },

    examples:[
        {
            input:String,
            output:String,
            explanation:String
        }
    ],

    testCases:[
        {
            input:String,
            output:String
        }
    ],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AuthUser"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "Problem",
    problemSchema
);