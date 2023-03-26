import express from "express";
import {
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../controller/main.js";
const router = express.Router();


router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", addMovie);
router.delete("/:id", deleteMovie);
router.patch("/:id", updateMovie);

export default router;
