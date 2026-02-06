import Subscription from "../Models/Subscription.js";

export const newSubscriber = async (req, res) => {
  try {
    const user = req.user;

    const { topicId } = req.body;

    console.log(user, topicId);

    if (!user || !topicId) {
      return res
        .status(400)
        .json({ message: "Could not subscribe, All Fields Required" });
    }

    const sub = Subscription.create({
      topic: topicId,
      User: user,
    });

    return res.status(200).json({ message: "Subscription Successful" });
  } catch (err) {
    return res.status(500).json("Something went wrong");
  }
};
