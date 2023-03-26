import express from "express";
import moviesRouter from "./routes/routes.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/movies", moviesRouter);

export default app;
