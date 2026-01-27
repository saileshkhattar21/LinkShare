import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname : {type: String, required :true}, 
    lastname :{type:String, required : true}, 
    username :{type :String, required :true, unique :true}, 
    email : {type : String, required:true, unique : true},
    password : {type :String, required :true, unique : true}, 
<<<<<<< HEAD
    photo : {type : String}
=======
    photo : {type : String}, 

    resetOTP :{type: String},
    resetOTPexpirt : {type : Date}
>>>>>>> password-reset
}, {timestamps : true})

export default mongoose.model("User", UserSchema);