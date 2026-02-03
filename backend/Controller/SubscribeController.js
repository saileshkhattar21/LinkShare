import Subscription from "../Models/Subscription.js";

export const newSubscribe = async (req, res) => {
  try {
    const user = req.user;

    const { topic, seriousness } = req.body;

    console.log(user, topic);

    if (!user || !topic || seriousness) {
      return res
        .status(400)
        .json({ message: "Could not subscribe, All Fields Required" });
    }

    const sub = Subscription.create({
      topic: topic,
      user: user,
      seriousness: seriousness,
    });

    return res.status(200).json({ message: "Subscription Successful" });
  } catch (err) {
    return res.status(500).json("Something went wrong");
  }
};
