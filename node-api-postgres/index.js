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

app.get("/passenger_list", db.passengers);
app.get("/aircraft", db.aircraft);
app.get("/airports", db.airports);
app.get("/arrivals", db.arrivals);
app.get("/cities", db.cities);
app.get("/arrive", db.arrive);
app.get("/passenger_airports", db.passenger_airports);
app.get("/airportCities", db.airportCities);
app.get("/flights", db.flights);
app.get("/departArriveAirport", db.departArriveAirport);
app.get("/airportPassengers", db.airportPassengers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);

});