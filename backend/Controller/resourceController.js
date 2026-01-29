import Resource from "../Models/Resource.js";
import Topics from "../Models/Topics.js";
import Users from "../Models/Users.js";

export const shareDocument = async (req, res) => {
  try {
    const { description, topic, uploadType } = req.body;
    console.log(description, topic, uploadType);
    console.log(req.user);

    const resource = Resource.create({
      description: description,
      type: "Document",
      content: req.file ? req.file.filename : null,
      createdBy: req.user,
      topic: topic,
    });

    return res.status(201).json({ message: "Resource added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
