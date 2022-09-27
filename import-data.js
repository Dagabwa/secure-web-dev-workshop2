require('dotenv').config()
//console.log(process.env.MONGO_URI)
const mongoose= require('mongoose')
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
async function main(){
        const result = await mongoose.connect(process.env.MONGO_URI)
        //const result = await Promise.all([mongoose.connect(1),mongoose.connect(2)])
        console.log('connected')
        const Location = new mongoose.model('Location',Locations)
        const maPremiereLocation = new Location({filmType:'Horror'})
        await maPremiereLocation.save()
}
main()
