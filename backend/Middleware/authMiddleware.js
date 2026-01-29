import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "token not found. Can not log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.username = decoded.username;
    next();
  } catch {
    res.status(401).json({ message: "Token is invalid" });
  }
}
