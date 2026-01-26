import mongoose from "mongoose"


const ResorceRating =  new mongoose.Schema({
    resource :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : Resource
    }, 
    user : {type : mongoose.Schema.Types.ObjectId, ref : User},
    score : {type: number}
})


export default mongoose.model("Ratings", ResorceRating)