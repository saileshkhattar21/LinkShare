import mongoose from "mongoose";
import User from "../Models/Users.js"

const TopicsSchema = new mongoose.Schema({
    name : {type: String, required :true},
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : User
    }, 
    visibility : {type : String, enum :["Private", "Public"], default : "Public"}
}, {timestamps : true})

export default mongoose.model("Topics", TopicsSchema)