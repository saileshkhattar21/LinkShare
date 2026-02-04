import express from "express";
import auth from "../Middleware/authMiddleware.js";
import { SearchUser } from "../Controller/SearchController.js";

const SearchRouter = express.Router();

SearchRouter.get("/users", auth, SearchUser);

export default SearchRouter;
