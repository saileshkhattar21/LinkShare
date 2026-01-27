import mongoose from "mongoose"

const ReadingItem =  new mongoose.Schema({
    Resource : {type : mongoose.Schema.Types.ObjectId, ref : Resource}, 
    User : {type : mongoose.Schema.Types.ObjectId, ref :User},
    isRead : {type : Boolean}
})

export default mongoose.model("Reading", ReadingSchema)

