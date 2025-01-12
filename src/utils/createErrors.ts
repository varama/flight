import { FLIGHTTYPES } from "./enums";
import { getDate } from "./getDate";
import { FlightCalendarInterface, FlightsInterface } from "./interfaces";

interface ErrorsProps {
  trip: FLIGHTTYPES;
  flightFrom: FlightsInterface;
  flightTo: FlightsInterface;
  flightCalendar: FlightCalendarInterface;
}

export const createErrors = ({
  trip,
  flightFrom,
  flightTo,
  flightCalendar,
}: ErrorsProps): Array<number> => {
  const errors: Array<number> = [];
  if (flightFrom.entityId === "") errors.push(0);
  if (flightTo.entityId === "") errors.push(1);
  if (
    new Date(flightCalendar.dateFrom) < new Date(getDate(new Date().toString()))
  ) {
    errors.push(2);
  }
  if (
    trip === FLIGHTTYPES.ROUND &&
    new Date(flightCalendar.dateTo) < new Date(flightCalendar.dateFrom)
  ) {
    errors.push(3);
  }

  return errors;
};
