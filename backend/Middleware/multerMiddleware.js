import multer from "multer";
import path from "path";
import fs from "fs";

const TEMP_DIR = "Uploads/tmp";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    cb(null, TEMP_DIR);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, name + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profile") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Profile must be an image"));
    }
  }

  if (file.fieldname === "document") {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Invalid document type"));
    }
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
