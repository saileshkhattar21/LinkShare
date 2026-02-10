import ResourceRating from "../Models/ResourceRating.js";

export const newRating = async (req, res) => {
  const user = req.user;
  const { rating, resource } = req.body;

  if (!user || !rating || !resource) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  console.log(user, rating, resource);

  try {
    const existingrating = await ResourceRating.findOne({
      $and: [{ resource: resource }, { user: user }],
    });

    if (existingrating) {
      existingrating.score = rating;

      await existingrating.save();

      return res.status(200).json({ message: "Rating Updated Successfully" });
    }
    const userRating = await ResourceRating.create({
      resource: resource,
      user: user,
      score: Number(rating),
    });

    return res.status(200).json({ message: "Rating Updated Successfully" });
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};
