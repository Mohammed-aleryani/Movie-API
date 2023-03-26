import { v4 as uuid } from "uuid";

export let movies = [];

export const setMoviesLest = (value) => {
  movies = value;
};

export const getMovies = (req, res) => {
  if (movies.length == 0) {
    res.status(200).json("There is no movies");
    return;
  }
  res.status(200).json(movies);
};

export const getMovie = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id == id);
  if (!foundMovie)
    return res.status(404).json(`There is no movie with this id ${id}`);
  res.status(200).json(foundMovie);
};

export const addMovie = (req, res) => {
  const movie = req.body;
  const movieId = uuid();
  if (Object.keys(movie).length != 3)
    return res
      .status(404)
      .json("You have to enter only title, director and release_date");
  if (!movie.title || !movie.director || !movie.release_date)
    return res
      .status(404)
      .json("Please enter title, director and release_date");
  movies.push({ id: movieId, ...movie });
  res.status(201).json(`Movie with id ${movieId} has been added`);
};

export const deleteMovie = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id == id);
  if (!foundMovie)
    return res.status(404).json(`There is no movie with this id ${id}`);
  movies = movies.filter((movie) => movie.id != id);
  res.status(204).send("Movie deleted successfully");
};

export const updateMovie = (req, res) => {
  const { title, director, release_date } = req.body;
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if (!movie) return res.status(404).json(`There is no movie with id ${id}`);
  if (title) movie.title = title;
  if (director) movie.director = director;
  if (release_date) movie.release_date = release_date;
  res.status(202).json(`user with id ${id} has been updated`);
};
