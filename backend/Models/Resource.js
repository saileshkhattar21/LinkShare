import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema ({
    description : {type : String, required :true}, 
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : User}, 
    Topic : {type : mongoose.Schema.Types.ObjectId, ref : Topics},
}, {timestamps : true})


export default mongoose.model("Resource",ResourceSchema)