import Resource from "../Models/Resource.js";
import Topics from "../Models/Topics.js";
import Subscription from "../Models/Subscription.js";
import Users from "../Models/Users.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

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
  try {
    const userId = req.user;

    console.log(userId);

    const pipeline = [
      {
        $lookup: {
          from: "topics",
          localField: "topic",
          foreignField: "_id",
          as: "topic",
        },
      },
      { $unwind: "$topic" },

      {
        $match: {
          "topic.visibility": "Public",
        },
      },
    ];

    if (userId) {
      pipeline.push(
        {
          $lookup: {
            from: "subscriptions",
            let: { topicId: "$topic._id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$topic", "$$topicId"] },
                      { $eq: ["$User", new mongoose.Types.ObjectId(userId)] },
                    ],
                  },
                },
              },
            ],
            as: "subscription",
          },
        },
        {
          $addFields: {
            isSubscribed: { $gt: [{ $size: "$subscription" }, 0] },
          },
        },
        {
          $project: {
            subscription: 0,
          },
        },
      );
    } else {
      pipeline.push({
        $addFields: {
          isSubscribed: false,
        },
      });
    }

    pipeline.push(
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
      { $unwind: "$createdBy" },

      {
        $project: {
          description: 1,
          type: 1,
          url: 1,
          content: 1,
          createdAt: 1,
          isSubscribed: 1,

          "topic._id": 1,
          "topic.name": 1,

          "createdBy._id": 1,
          "createdBy.username": 1,
          "createdBy.firstname": 1,
          "createdBy.lastname": 1,
          "createdBy.photo": 1,
        },
      },
    );

    const resources = await Resource.aggregate(pipeline);
    console.log(resources);
    return res.status(200).json(resources);
  } catch (err) {
    console.error(err);
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
      {
        $match: {
          User: new mongoose.Types.ObjectId(user),
        },
      },

      {
        $lookup: {
          from: "resources",
          localField: "topic",
          foreignField: "topic",
          as: "resources",
        },
      },

      {
        $unwind: "$resources",
      },

      {
        $replaceRoot: {
          newRoot: "$resources",
        },
      },

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

export const popularPosts = async (req, res) => {
  console.log("Getting Subscribed Posts");

  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Could not find user" });
  }

  try {
    const resources = await Subscription.aggregate([
      {
        $match: {
          User: new mongoose.Types.ObjectId(user),
        },
      },

      {
        $lookup: {
          from: "resources",
          localField: "topic",
          foreignField: "topic",
          as: "resources",
        },
      },

      {
        $unwind: "$resources",
      },

      {
        $replaceRoot: {
          newRoot: "$resources",
        },
      },

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
