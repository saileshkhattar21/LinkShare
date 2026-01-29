import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadType = req.body.uploadType;

    if (!uploadType) {
      return cb(new Error("uploadType is Required"));
    }

    const userID = req.user?.id;
    const username = req.body.username;

    let basefolder;

    if (userID) {
      basefolder = `Uploads/${userID}`;
    } else if (username) {
      basefolder = `Uploads/temp/${username}`;
    } else {
      return cb(new Error("userId OR username is reuired"));
    }

    const folder =
      uploadType === "profile"
        ? `${basefolder}/profile`
        : `${basefolder}/documents`;

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb){
    const uploadType =req.body.uploadType;

    if(uploadType === "profile"){
        if(!file.mimetype.startwith("image/")){
            return cb(new Eroor("Only images are allowed"))
        }
    }

    if(uploadType === "Document"){
        const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if(!allowed.includes(file.mimetypes)){
        return cb(new Error("Invalid Document type"))
    }
    }

    cb(null, true)
}



const moveTempProfile = (username, userId) => {
  const tempPath = path.join("uploads", "temp", username);
  const finalPath = path.join("uploads", "users", userId.toString());

  if (!fs.existsSync(tempPath)) {
    return; // nothing to move
  }

  fs.mkdirSync(path.dirname(finalPath), { recursive: true });

  fs.renameSync(tempPath, finalPath);
};

export default moveTempProfile;


export const uploaad = multer({
    storage, 
    fileFilter,
    limits : {fileSize : 10*1024*1024} 
})