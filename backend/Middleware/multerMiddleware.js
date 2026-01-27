import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination :"Uploads/",
    filename : (req, file, callback)=>{
        callback(null, Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage})

export default upload;