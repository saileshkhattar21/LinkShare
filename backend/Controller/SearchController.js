import User from "../Models/Users.js";

export const SearchUser = async (req, res) => {
  try {
    console.log("dsdsdsdwefwef");
    const q = req.query.q;

    console.log("backend qery>>>", q);

    if (!q || q.length < 2) {
      console.log("fsdf");
      return res.status(200).json([]);
    }

    const users = await User.find({ username: { $regex: q, $options: "i" } });
    res.status(200).json(users);
  } catch (err) {
    console.error("User search error:", err);
    res.status(500).json({ message: "User search failed" });
  }
};
