// Pool(pg) const with all user credentials & CONSTANTS
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QAP1",
  password: "1337",
  port: 5432,
});

// PASSENGERS___DATA FROM TABLES IN postgreSQL
const passengers = (request, response) => {
  pool.query(
    "SELECT * FROM airports_qap1.passenger ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// PASSENGERS___GET REQUEST: SEARCH BY ID
const passById = (request, response) => {
  const id = parseInt(request.query.id);
  pool.query(
    "SELECT * FROM airports_qap1.passenger WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// PASSENGERS___POST REQUEST FUNCTION
const createPassenger = (request, response) => {
  const { id, first_Name, last_name, phone_Number } = request.body;
  pool.query(
    "INSERT INTO airports_qap1.passenger (id, first_Name, last_name, phone_Number) VALUES ($1, $2, $3, $4)",
    [id, first_Name, last_name, phone_Number],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Passenger Credentials Added with ID: ${results.insertId}`);
    }
  );
};

// PASSENGERS___PUT REQUEST FUNCTION
const updatePassenger = (request, response) => {
  const id = parseInt(request.params.id);
  const { first_Name, last_name, phone_Number } = request.body;
  pool.query(
    "UPDATE airports_qap1.passenger SET first_Name = $1, last_name = $2, phone_Number = $3 WHERE id = $4",
    [first_Name, last_name, phone_Number, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Passenger Credentials Updated with ID: ${id}`);
    }
  );
};

// PASSENGERS___DELETE REQUEST FUNCTION
const deletePassenger = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM airports_qap1.passenger WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Passenger Credentials Deleted with ID: ${id}`);
    }
  );
};

//-------------------------------------------------------
// AIRPORTS___DATA FROM TABLES IN postgreSQL
const airports = (request, response) => {
  pool.query(
    "SELECT * FROM airports_qap1.airport ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// CITY___DATA FROM TABLES IN postgreSQL
const city = (request, response) => {
  pool.query(
    "SELECT * FROM airports_qap1.city ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// AIRCRAFT___DATA FROM TABLES IN postgreSQL
const aircraft = (request, response) => {
  pool.query(
    "SELECT * FROM airports_qap1.aircraft ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//-----------------------------------------------------
// QUESTIONS TO BE ANSWERED:

// What airports are in what cities?
const question1 = (request, response) => {
  pool.query(
    'SELECT airport.id, airport."airport_name", city."city_Name" FROM airports_qap1.airport, airports_qap1.city WHERE city.id = airport.city_id ORDER BY airport.id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// List all aircraft passengers have travelled on?
const question2 = (request, response) => {
  pool.query(
    'SELECT passenger."first_name", passenger."last_name", aircraft."type" FROM "airports_qap1".passenger, "airports_qap1".aircraft, "airports_qap1".passenger_aircraft WHERE passenger.id = passenger_aircraft.passenger_id and aircraft.id = passenger_aircraft.aircraft_id ORDER BY passenger.id',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// Which airports can aircraft take off from and land at?
const question3 = (request, response) => {
  pool.query(
    'SELECT aircraft."type", departures."depart_name", arrivals."arrival_name" FROM airports_qap1.airport, airports_qap1.aircraft, airports_qap1.airport_aircraft, airports_qap1.departures, airports_qap1.arrivals WHERE airport.id = airport_aircraft.airport_name and aircraft.id = airport_aircraft.aircraft_type and departures.id = airport_aircraft.depart and arrivals.id = airport_aircraft.arrive ORDER BY airport.id',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// What airports have passengers used?
const question4 = (request, response) => {
  pool.query(
    'select passenger."first_name", passenger."last_name", airport."airport_name" FROM airports_qap1.passenger, airports_qap1.airport, airports_qap1.airports_passengers where passenger.id = airports_passengers.passenger_id and airport.id = airports_passengers.airport_id order by passenger.id',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// EXPORTS
module.exports = {
  passengers,
  passById,
  airports,
  city,
  aircraft,
  question1,
  question2,
  question3,
  question4,
  createPassenger,
  updatePassenger,
  deletePassenger,
};
