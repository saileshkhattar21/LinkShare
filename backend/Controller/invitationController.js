import Invitations from "../Models/Invitations.js";
import Subscription from "../Models/Subscription.js";

export const createInvite = async (req, res) => {
  try {
    const user = req.user;

    const { topic, users } = req.body;

    if (!user || !topic || users.length === 0) {
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

    return res.status(200).json({ message: "Invtes sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getInvites = async (req, res) => {
  console.log("DDSDsdsdsdsds");
  const user = req.user;

  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  console.log(user);

  try {
    const invites = await Invitations.find({
      invitedUser: user,
    });

    return res.status(200).json(invites);
  } catch (err) {
    return res.status(500).json({ message: "Could not fetch invites" });
  }
};

export const acceptInvite = async (req, res) => {
  const user = req.user;

  const { invite } = req.body;

  console.log(user, invite);

  if (!user || !invite) {
    return res.status(400).json({ message: "Could not accept invite" });
  }

  try {
    const subscibe = await Subscription.create({
      topic: invite.topic,
      User: req.user,
    });

    console.log(subscibe);

    const delete_invite = await Invitations.deleteOne({ _id: invite._id });

    return res.status(200).json({ message: "Invite Accepted" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const rejectinvite = async (req, res) => {
  const user = req.user;
  const { invite } = req.body;

  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  try {
    const rejected_invite = await Invitations.deleteOne({ _id: invite._id });

    if (rejected_invite) {
      return res.status(200).json({ message: "Invite Rejected" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
