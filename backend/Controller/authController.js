import User from "../Models/Users"
import bycrypt from "bycrypt"
import jwt from "jsonwebtoken"

export const register =async (req ,res)=>{
    try{
        const {firstname, lastname, password, username, email} = req.body;
        
        const existing_user = User.findOne({
            $or : [{email}, {username}]
        })

        if (existing_user){
            return res.status(400).json({message : "User already exists"})
        }

        const salt  = bycrypt.gensalt(10);
        const hashedpassword = await bycrypt.hash(password, salt);

        const user = await User.create({
            firstname, 
            lastname, 
            username, 
            email, 
            password : hashedpassword,
            photo : req.file?req.file.filename:null
        })

        console.log(user)

        res.status(201).json({message : "User Created Successfully"})
    }catch{
        res.status(500).json({mesage : err.message})
    }

    

}

