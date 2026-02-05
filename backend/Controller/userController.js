import User from "../Models/Users.js";

export const getUserDetails = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }

  try {
    const userDetails = await User.find({ _id: user });
    if (!userDetails) {
      return req.status(400).json({ message: "Could not find user details" });
    }

    return res.status(200).json(userDetails);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
