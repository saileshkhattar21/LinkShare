import mongoose from "mongoose";

const SubscriptionSchema  = new mongoose.Schema({
    topic : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Topics
    }, 

    User : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : User
    }, 
    seriousness : {
        type : string, 
        enum : ["Serious", "Very Serious", "Casual"]
    }, 

}, {timestamps : true})


export default mongoose.model("Subscription", SubscriptionSchema)