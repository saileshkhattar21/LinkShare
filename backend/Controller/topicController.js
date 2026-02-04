import Topics from "../Models/Topics.js";

export const createTopic = async (req, res) => {
  console.log(req.body);
  try {
    console.log("try");
    const user_id = req.user;
    console.log(user_id);

    const { name, visibility } = req.body;
    console.log(name, visibility);

    if (!name || !visibility) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    console.log(user_id, name, visibility);

    const existingTopic = await Topics.findOne({
      $and: [{ User: user_id }, { name: name }],
    });

    if (existingTopic) {
      res.status(400).json({ message: "Topic Already Exists" });
    }

    const topic = await Topics.create({
      name: name,
      user: user_id,
      visibility: visibility,
    });

    res.status(200).json({ message: "Topic Created Successfully" });
  } catch (err) {
    res.status(500).json({ mesage: err.mesage });
  }
};

export const getTopic = async (req, res) => {
  try {
    console.log("Here");
    const user_id = req.user;

    console.log(user_id);
    const topics = await Topics.find({ user: user_id });

    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
