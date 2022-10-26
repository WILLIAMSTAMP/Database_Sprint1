const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvdrental",
  password: "Seedweed296!",
  port: 5432,
});

const passengers = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".passenger_list order by id desc' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const aircraft = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".aircraft order by id desc' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const airports = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".airports order by id desc' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const arrivals = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".arrivals order by id desc' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const cities = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".cities order by id desc' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const arrive = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".arrive_from_to' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const passenger_airports = (request, response) => {
  pool.query(
    'select * from "williamstamp_QAP_db".passenger_airports order by id desc' ,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const airportCities = (request, response) => {
  pool.query(
    'SELECT airports.id, airports."airport_name", cities."city_name" FROM "williamstamp_QAP_db".airports, "williamstamp_QAP_db".cities WHERE cities.id = airports.city_id ORDER BY airports.id ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const flights = (request, response) => {
  pool.query(
    'SELECT passenger_list."first_name", passenger_list."last_name", aircraft."craft_type" FROM "williamstamp_QAP_db".passenger_list, "williamstamp_QAP_db".aircraft, "williamstamp_QAP_db".passenger_aircraft WHERE passenger_list.id = passenger_aircraft.passenger_id and aircraft.id = passenger_aircraft.aircraft_id order by passenger_list.id',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const departArriveAirport = (request, response) => {
  pool.query(
    'SELECT airports."airport_name", aircraft."craft_type", airports."airport_name", arrivals."arrival_airport" FROM "williamstamp_QAP_db".airports, "williamstamp_QAP_db".aircraft, "williamstamp_QAP_db".arrive_from_to, "williamstamp_QAP_db".arrivals WHERE airports.id = arrive_from_to.airport_name and aircraft.id = arrive_from_to.aircraft_type and airports.id = arrive_from_to.depart_from and arrivals.id = arrive_from_to.arrive_to ORDER BY airports.id',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const airportPassengers = (request, response) => {
  pool.query(
    'SELECT passenger_list."first_name", passenger_list."last_name", airports."airport_name" from "williamstamp_QAP_db".passenger_list, "williamstamp_QAP_db".airports, "williamstamp_QAP_db".passengers_airports where passenger_list."id" = passengers_airports.passenger_id and airports.id = passengers_airports.airports_id order by passenger_list.id',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  passengers,
  aircraft,
  airports,
  arrivals,
  cities,
  arrive,
  passenger_airports,
  airportCities,
  flights,
  departArriveAirport,
  airportPassengers,



};
