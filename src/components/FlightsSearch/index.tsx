import React from "react";
import { FLIGHTCLASSES, FLIGHTTYPES } from "utils/enums";
import {
  FlightCalendarInterface,
  FlightsInterface,
  PassangersInterface,
} from "utils/interfaces";

interface FlightsSearchProps {
  fetchAirport: (query: string) => Promise<any>;
  fetchFlights: (
    trip: FLIGHTTYPES,
    passangers: PassangersInterface,
    flightClass: FLIGHTCLASSES,
    flightFrom: FlightsInterface,
    flightTo: FlightsInterface,
    flightCalendar: FlightCalendarInterface
  ) => void;
  debounceDelay: number;
  passangersDefaultData: PassangersInterface;
}

const FlightsSearch: React.FC<FlightsSearchProps> = ({
  fetchAirport,
  fetchFlights,
  debounceDelay,
  passangersDefaultData,
}) => {
  return <div>Flight Search</div>;
};

export default FlightsSearch;
