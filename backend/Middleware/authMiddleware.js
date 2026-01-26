import jwt from "jsonwebtoken"

export const auth = (req, res, next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json("token not found. Can not log in")
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECREt);
        req.user = decoded.id;
        next()
    }catch{
        res.status(401).json({message : "Token is invalid"})
    }
}