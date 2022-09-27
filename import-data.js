require('dotenv').config()
//console.log(process.env.MONGO_URI)
const mongoose= require('mongoose')
const { Schema } = mongoose;
const Locations = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate:   Date,
    district: String,
    geolocation:{
        coordinates:{
            type: [Number],
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