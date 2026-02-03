import Invitations from "../Models/Invitations.js";

export const createInvite = async (req, res) => {
  try {
    const user = req.user;

    const { topic, users } = req.body;

    if (!user || !topic || !users.length() === 0) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    users.map((user) => {
      const invite = Invitations.create({
        topic: topic,
        invitedUser: user._id,
        invitedBy: req.user,
        expiredAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
