-- Table Queries -- 
SELECT * FROM airports_qap1.city ORDER BY id ASC;
SELECT * FROM airports_qap1.airport ORDER BY id ASC;
SELECT * FROM airports_qap1.aircraft ORDER BY id ASC;
SELECT * FROM airports_qap1.passenger ORDER BY id ASC;
SELECT * FROM airports_qap1.airport_aircraft ;

--Question 2 Check --
SELECT passenger."first_name", passenger."last_name", aircraft."type"
FROM airports_qap1.passenger, airports_qap1.aircraft, airports_qap1.passenger_aircraft
WHERE passenger.id = passenger_aircraft.passenger_id and aircraft.id = passenger_aircraft.aircraft_id
order by passenger.id;

-- Question 3 Check -- 
SELECT aircraft."type", departures."depart_name", arrivals."arrival_name"
FROM airports_qap1.airport, airports_qap1.aircraft, airports_qap1.airport_aircraft, airports_qap1.departures, 
airports_qap1.arrivals
WHERE airport.id = airport_aircraft.airport_name and aircraft.id = airport_aircraft.aircraft_type
and departures.id = airport_aircraft.depart and arrivals.id = airport_aircraft.arrive
ORDER BY airport.id;

-- Question 4 Check --
select passenger."first_name", passenger."last_name", airport."airport_name"
FROM airports_qap1.passenger, airports_qap1.airport, airports_qap1.airports_passengers
where passenger.id = airports_passengers.passenger_id and airport.id = airports_passengers.airport_id
order by passenger.id;