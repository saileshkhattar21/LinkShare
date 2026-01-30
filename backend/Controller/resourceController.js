import Resource from "../Models/Resource.js";
import Topics from "../Models/Topics.js";
import Users from "../Models/Users.js";
import fs from "fs";
import path from "path";

export const shareDocument = async (req, res) => {
  try {
    const { description, topic, uploadType } = req.body;
    console.log(description, topic, uploadType);
    const userId = req.user;
    console.log(req.user);

    const file = req.file;

    if (!userId) {
      if (file) fs.unlinkSync(file.path);
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!file) {
      return res.status(400).json({ message: "Document file required" });
    }

    const docDir = `Uploads/${userId}/documents`;
    fs.mkdirSync(docDir, { recursive: true });

    const finalPath = path.join(docDir, file.filename);
    fs.renameSync(file.path, finalPath);

    const resource = Resource.create({
      description: description,
      type: "Document",
      content: req.file ? req.file.filename : null,
      createdBy: req.user,
      topic: topic,
    });

    return res.status(201).json({ message: "Resource added Successfully" });
  } catch (err) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    return res.status(500).json({ message: err.message });
  }
};

export const shareLInk = async (req, res) => {
  const { link, topic } = req.body;
};
