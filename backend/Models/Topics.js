import mongoose from "mongoose";

const TopicsSchema = new mongoose.Schema({
    name : {type: string, required :true},
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : User
    }, 
    visibility : {type : String, enum :["Private", "Public"], default : "Public"}
}, {timestamps : true})

export default mongoose.model("Topics", TopicsSchema)