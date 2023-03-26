import app from "../app.js";
import request from "supertest";
import { movies, setMoviesLest } from "../controller/main.js";

describe("GET /movies", () => {
  it("responds with an empty array if there are no movies", async () => {
    const response = await request(app).get("/movies").expect(200);
    expect(response.body).toEqual("There is no movies");
  });
  it("responds with an array of movies if there are movies", async () => {
    setMoviesLest([
      {
        id: "1",
        title: "The Godfather",
        director: "Francis Ford Coppola",
        release_date: "1972",
      },
      {
        id: "1",
        title: "The Dark Knight",
        director: "Christopher Nolan",
        release_date: "2008",
      },
    ]);
    const response = await request(app).get("/movies").expect(200);

    expect(response.body).toEqual(movies);
  });
});



describe("GET /movies/:id", () => {
  it("responds with a movie if it exists", async () => {
    const response = await request(app).get(`/movies/1`).expect(200);

    expect(response.body).toEqual({
      id: "1",
      title: "The Godfather",
      director: "Francis Ford Coppola",
      release_date: "1972",
    });
  });


  it("responds with an error message if the movie does not exist", async () => {
    const response = await request(app).get(`/movies/2`).expect(404);
  });
});


describe("POST /movies", () => {
  it("add a movie and responds with a success message", async () => {
    const movie = {
      title: "The Godfather",
      director: "Francis Ford Coppola",
      release_date: "1972",
    };
    const response = await request(app).post("/movies").send(movie).expect(201);
  });


  it("responds with an error message if the title, director, or release_date fields are missing", async () => {
    const response = await request(app)
      .post("/movies")
      .send({ title: "The Godfather", director: "Francis Ford Coppola" })
      .expect(404);

    expect(response.body).toEqual(
      "You have to enter only title, director and release_date"
    );
  });
});


describe("DELETE /movies/:id", () => {
  it("deletes a movie and responds with a success message", async () => {
    const response = await request(app).delete(`/movies/1`).expect(204);
  });
  it("delete not founded movie", async () => {
    const response = await request(app).delete(`/movies/2`).expect(404);
  });
});

setMoviesLest([]);
