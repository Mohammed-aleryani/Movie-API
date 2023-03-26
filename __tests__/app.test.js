import app from "../app.js";
import request from "supertest";

const movie = {
  title: "The Godfather",
  director: "Francis Ford Coppola",
  release_date: "1972",
};
let id;

describe("GET /movies", () => {
  it("responds with an empty array if there are no movies", async () => {
    const response = await request(app).get("/movies").expect(200);
    expect(response.body).toEqual([]);
  });
  it("responds with an array of movies if there are movies", async () => {
    // setMoviesLest();
    await request(app).post("/movies").send(movie);
    const response = await request(app).get("/movies").expect(200);

    expect(response.body.length > 0);
    id = response.body;
  });
});

describe("GET /movies/:id", () => {
  it("responds with a movie if it exists", async () => {
    const response = await request(app)
      .get(`/movies/${id[0]["id"]}`)
      .expect(200);
    console.log(id[0].id);
    expect(response.body).toEqual(id[0]);
  });

  it("responds with an error message if the movie does not exist", async () => {
    const response = await request(app).get(`/movies/2`).expect(404);
  });
});

describe("POST /movies", () => {
  it("add a movie and responds with a success message", async () => {
    const response = await request(app).post("/movies").send(movie).expect(201);
    expect(response.body);
  });

  it("responds with an error message if the title, director, or release_date fields are missing", async () => {
    const response = await request(app)
      .post("/movies")
      .send({ title: "The Godfather", director: "Francis Ford Coppola" })
      .expect(400);

    expect(response.body).toEqual(
      "You have to enter only title, director and release_date"
    );
  });
});

describe("PATCH /movies/:id", () => {
  it("updates an existing movie and responds with a success message", async () => {
    const updatedMovie = {
      title: "The Godfather: Part II",
      director: "Francis Ford Coppola",
      release_date: "1974",
    };
    console.log(id[0].id);

    const response = await request(app)
      .patch(`/movies/${id[0].id}`)
      .send(updatedMovie)
      .expect(200);

    expect(response.body).toBe(`movie with id ${id[0].id} has been updated`);
  });

  it("returns a 404 error if the movie does not exist", async () => {
    const updatedMovie = {
      title: "The Godfather: Part II",
      director: "Francis Ford Coppola",
      release_date: "1974",
    };

    const response = await request(app)
      .patch(`/movies/1`)
      .send(updatedMovie)
      .expect(404);

    expect(response.body).toBe(`There is no movie with id 1`);
  });
});

describe("DELETE /movies/:id", () => {
  it("deletes a movie and responds with a success message", async () => {
    let response = await request(app).delete(`/movies/${id[0].id}`).expect(204);
    expect(response);
  });
  it("delete not founded movie", async () => {
    const response = await request(app).delete(`/movies/1`).expect(404);
    expect(response.body).toEqual("There is no movie with this id 1");
  });
});
