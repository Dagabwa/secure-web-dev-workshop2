const {Schema} = require("mongoose");
require('dotenv').config()
//console.log(process.env.MONGO_URI)
import mongoose from 'mongoose';
const { Schema } = mongoose;
const monSchema = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate:   Date,
    district: String,
    geolocation:{
        coordinates:{
            type: [Number,Number],
            required: true
        },
        type : {
            type:String,
            enum:['Point'],
            required:true
        }
    } ,
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});