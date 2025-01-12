import React from "react";
import { FLIGHTCLASSES, FLIGHTDIRECTION, FLIGHTTYPES } from "utils/enums";
import {
  FlightCalendarInterface,
  FlightsInterface,
  PassangersInterface,
} from "utils/interfaces";
import Passangers from "components/Passanges";
import FlightDirection from "components/FlightDirection";
import FlightCalendar from "components/FlightCalendar";
import Options from "components/Options";
import styles from "./style.module.scss";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getDate } from "utils/getDate";

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
  const [tripType, setTripType] = React.useState<FLIGHTTYPES>(
    FLIGHTTYPES.ROUND
  );
  const [passangersNumber, setPassangersNumber] = React.useState(1);
  const [passangersData, setPassangersData] =
    React.useState<PassangersInterface>(passangersDefaultData);
  const [flightClass, setFlightClass] = React.useState<FLIGHTCLASSES>(
    FLIGHTCLASSES.ECONOMY
  );
  const [flightFrom, setFlightFrom] = React.useState<FlightsInterface>({
    name: "",
    value: "",
    entityId: "",
  });
  const [flightTo, setFlightTo] = React.useState<FlightsInterface>({
    name: "",
    value: "",
    entityId: "",
  });
  const [flightCalendar, setFlightCalendar] =
    React.useState<FlightCalendarInterface>({
      dateFrom: getDate(new Date().toString()),
      dateTo: getDate(new Date().toString()),
    });

  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        <Options
          value={tripType}
          options={[FLIGHTTYPES.ROUND, FLIGHTTYPES.ONE]}
          onSelect={(option: FLIGHTTYPES | FLIGHTCLASSES) => {
            setTripType(option as FLIGHTTYPES);
          }}
        />
        <Passangers
          value={passangersData}
          total={passangersNumber}
          maximumPassangers={9}
          onChange={(data: PassangersInterface, total: number) => {
            setPassangersData(data);
            setPassangersNumber(total);
          }}
        />
        <Options
          value={flightClass}
          options={[
            FLIGHTCLASSES.ECONOMY,
            FLIGHTCLASSES.PECONOMY,
            FLIGHTCLASSES.BUSINESS,
            FLIGHTCLASSES.FIRST,
          ]}
          onSelect={(option: FLIGHTTYPES | FLIGHTCLASSES) => {
            setFlightClass(option as FLIGHTCLASSES);
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 40 }}>
        <FlightDirection
          value={{ from: flightFrom, to: flightTo }}
          fromPlaceholder={"Where from?"}
          wherePlaceholder={"Where to?"}
          fetchAirport={fetchAirport}
          debounceDelay={debounceDelay}
          onChange={(data: FlightsInterface, update: FLIGHTDIRECTION) => {
            update === FLIGHTDIRECTION.FROM
              ? setFlightFrom(data)
              : setFlightTo(data);
          }}
        />
        <FlightCalendar
          dates={flightCalendar}
          tripType={tripType}
          onChange={(data: FlightCalendarInterface) => {
            setFlightCalendar({
              dateFrom: getDate(data.dateFrom),
              dateTo: getDate(data.dateTo),
            });
          }}
        />
      </div>
      <Button
        style={{
          position: "relative",
          width: "fit-content",
          margin: "auto",
          borderRadius: 20,
          top: 20,
        }}
        onClick={() => {
          fetchFlights(
            tripType,
            passangersData,
            flightClass,
            flightFrom,
            flightTo,
            flightCalendar
          );
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </div>
  );
};

export default FlightsSearch;
