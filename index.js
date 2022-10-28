// CONSTANTS:
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// GET REQUESTS FOR MAIN TABLE DATA
app.get("/passengers", db.passengers);
app.get("/airport", db.airports);
app.get("/city", db.city);
app.get("/aircraft", db.aircraft);

// PASSENGER BY ID
// EXAMPLE GET REQUEST IN POSTMAN: http://localhost:3000/passid?id=1
app.get("/passid", db.passById);

// QUESTIONS TO BE ANSWERED:
// What airports are in what cities?
app.get("/question1", db.question1);
// List all aircraft passengers have travelled on?
app.get("/question2", db.question2);
// Which airports can aircraft take off from and land at?
app.get("/question3", db.question3);
// What airports have passengers used?
app.get("/question4", db.question4);

// POST REQUESTS
app.post("/passenger", db.createPassenger);

// PUT REQUESTS
app.put("/passenger/:id", db.updatePassenger);

// DELETE REQUESTS
app.delete("/passenger/:id", db.deletePassenger);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
