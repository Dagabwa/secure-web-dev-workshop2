require('dotenv').config()
//console.log(process.env.MONGO_URI)
const mongoose= require('mongoose')
const filmingLocations = require('./lieux-de-tournage-a-paris.json')
const { Schema } = mongoose
const Locations = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate:   Date,
    district: String,
    geolocation:{
        coordinates:{
            type: [Number],
        },
        type : {
            type:String,
            enum:['Point'],
        }
    } ,
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
})
//mongoose.connect(process.env.MONGO_URI).then(()=>{
  //  console.log(('Connected !'))})
//console.log('toto')

async function jsonToMongo (filmingLocations) {
    const Location = new mongoose.model('Location',Locations)
    for(let filmingLocation of filmingLocations){
        const maLocation = new Location({
            filmType:  filmingLocation.fields.type_tournage,
            filmProducerName: filmingLocation.fields.nom_producteur,
            endDate:new Date (filmingLocation.fields.date_fin),
            district: filmingLocation.fields.ardt_lieu,
            geolocation: filmingLocation.fields.geo_shape,
            sourceLocationId: filmingLocation.fields.id_lieu,
            filmDirectorName: filmingLocation.fields.nom_realisateur,
            address: filmingLocation.fields.address_lieu,
            startDate: new Date(filmingLocation.fields.date_debut),
            year: Number(filmingLocation.fields.annee_tournage),
        })
        await maLocation.save()
    }
}
async function main(){
    const result = await mongoose.connect(process.env.MONGO_URI)
    //const result = await Promise.all([mongoose.connect(1),mongoose.connect(2)])
    console.log('connected')
    //await jsonToMongo(filmingLocations)
    console.log('done')
}
main()
