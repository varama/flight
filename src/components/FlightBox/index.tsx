import FlightsList from "components/FlightsList";
import FlightsSearch from "components/FlightsSearch";
import { useAsync } from "hooks/useAsync";
import React from "react";
import { FLIGHTCLASSES, FLIGHTTYPES } from "utils/enums";
import { getAirport, getFlights } from "utils/getFlights";
import {
  FlightCalendarInterface,
  FlightsInterface,
  PassangersInterface,
} from "utils/interfaces";
const FlightBox = () => {
  const { data: flights, isLoading, isError, error, run, reset } = useAsync();
  const passangersData = {
    adults: {
      count: 1,
      minimum: 1,
      title: "Adults",
      subtitle: "",
    },
    children: {
      count: 0,
      title: "Children",
      subtitle: "Aged 2-11",
    },
    infants: {
      count: 0,
      title: "Infants",
      subtitle: "In seat",
    },
  };

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <FlightsSearch
        fetchAirport={getAirport}
        fetchFlights={(
          trip: FLIGHTTYPES,
          passangers: PassangersInterface,
          flightClass: FLIGHTCLASSES,
          flightFrom: FlightsInterface,
          flightTo: FlightsInterface,
          flightCalendar: FlightCalendarInterface
        ) => {
          run(
            getFlights({
              adults: passangers.adults.count,
              childrens: passangers.children.count,
              infants: passangers.infants.count,
              cabinClass: flightClass.toLowerCase().split(" ").join("_"),
              date: flightCalendar.dateFrom,
              ...(trip === FLIGHTTYPES.ROUND && {
                returnDate: flightCalendar.dateTo,
              }),
              originID: flightFrom.value,
              originEntityID: flightFrom.entityId,
              destinationID: flightTo.value,
              destinationEntityID: flightTo.entityId,
            })
          );
        }}
        debounceDelay={200}
        passangersDefaultData={passangersData}
      />
      <FlightsList
        flights={flights}
        loading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default FlightBox;
