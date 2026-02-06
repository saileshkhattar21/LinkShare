import Resource from "../Models/Resource.js";
import Topics from "../Models/Topics.js";
import Subscription from "../Models/Subscription.js";
import Users from "../Models/Users.js";
import fs from "fs";
import path from "path";

export const shareDocument = async (req, res) => {
  try {
    const { description, topicID, uploadType } = req.body;
    console.log(description, topicID, uploadType);
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
      topic: topicID,
      createdBy: userId,
    });

    return res.status(201).json({ message: "Resource added Successfully" });
  } catch (err) {
    if (req.file?.path) fs.unlinkSync(req.file.path);
    return res.status(500).json({ message: err.message });
  }
};

export const shareLink = async (req, res) => {
  console.log("fwefwefwefwef");
  const { description, link, topicID } = req.body;
  const user = req.user;

  console.log(description, link, topicID);

  console.log(req.user);

  if (!user) {
    return res.status(401).json({ message: "not Authorised" });
  }

  if (!link || !topicID || !description) {
    return res.status(401).json({ message: "All fields are required" });
  }
  try {
    const resource = Resource.create({
      description: description,
      type: "Link",
      url: link,
      createdBy: user,
      topic: topicID,
    });

    return res.status(201).json({ message: "Resource Added Successfully!!!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const topPosts = async (req, res) => {
  console.log("Vasdvsadvs");
  try {
    const resources = await Resource.aggregate([
      {
        $lookup: {
          from: "topics",
          localField: "topic",
          foreignField: "_id",
          as: "topic",
        },
      },
      {
        $unwind: {
          path: "$topic",
          preserveNullAndEmptyArrays: false, // keep false if topic is mandatory
        },
      },

      {
        $match: {
          "topic.visibility": "Public",
        },
      },

      { $sort: { createdAt: -1 } },
      { $limit: 5 },

      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: false,
        },
      },

      {
        $project: {
          description: 1,
          type: 1,
          url: 1,
          content: 1,
          createdAt: 1,
          "topic.name": 1,
          "topic._id": 1,
          "topic.visibility": 1,
          "createdBy.username": 1,
          "createdBy._id": 1,
          "createdBy.firstname": 1,
          "createdBy.lastname": 1,
          "createdBy.photo": 1,
        },
      },
    ]);
    console.log(resources);

    return res.status(200).json(resources);
  } catch (err) {
    console.error("Aggregation error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const subscribedPosts = async (req, res) => {
  console.log("Getting Subscribed Posts");

  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Could not find user" });
  }

  try {
    const resources = await Subscription.aggregate([
      // Step 1 → Get subscriptions of current user
      {
        $match: {
          User: user._id,
        },
      },

      // Step 2 → Lookup resources from subscribed topics
      {
        $lookup: {
          from: "resources", // collection name in MongoDB (lowercase plural)
          localField: "topic",
          foreignField: "topic",
          as: "resources",
        },
      },

      // Step 3 → Flatten resources array
      {
        $unwind: "$resources",
      },

      // Step 4 → Replace root to return only resource object
      {
        $replaceRoot: {
          newRoot: "$resources",
        },
      },

      // Optional → Populate creator + topic details
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "topics",
          localField: "topic",
          foreignField: "_id",
          as: "topic",
        },
      },
      {
        $unwind: {
          path: "$topic",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Optional → Sort latest first
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json(resources);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
