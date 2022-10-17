require('dotenv').config()
//console.log(process.env.MONGO_URI)
const mongoose= require('mongoose')
const filmingLocations = require('./lieux-de-tournage-a-paris.json')
const { Schema } = mongoose
const Locations = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate:   Date,
    filmName: String,
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
const Location = mongoose.model('Location',Locations)
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
            filmName: filmingLocation.fields.nom_tournage,
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
function queryId(id) {
    Location.findById(id).then(film => console.log(film))
}

function queryFilmName(nameOfFilm) {
    Location.find({filmName : nameOfFilm}).then(films => films.forEach(film => console.log(film)))
}

function deleteId(id) {
    Location.findOneAndDelete({_id:id}).then(console.log('Deleted !'))
}

function addLocation(location) {
    try{
        location.save();
    } catch (e) {
        console.log("Something went wrong !")
    }
}

function updateLocation(id,parameter,update){
    //Location.update({_id:id},{filmProducerName :update})
    Location.updateOne({_id: id}, {$set:{parameter:update}}).then(console.log('done'))
}

async function main(){
    const result = await mongoose.connect(process.env.MONGO_URI)
    //const result = await Promise.all([mongoose.connect(1),mongoose.connect(2)])
    console.log('connected')
    //await jsonToMongo(filmingLocations)
    //await queryId("633f1ddb5968cf5f5f8f5654")
    //await addLocation(new Location ({filmName : "David c'est moi"}))
    //await deleteId("634d61eb8db12ad6cd8a38c2")
    //await queryFilmName("David c'est moi")
    await updateLocation("634d61fa92ffb8fe9e907423",'filmProducerName','David3')
    await queryId("634d61fa92ffb8fe9e907423")
    console.log('done')
}
main()
