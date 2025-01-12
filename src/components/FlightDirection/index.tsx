import React from "react";
import { FLIGHTDIRECTION } from "utils/enums";
import { FlightDirectionInterface, FlightsInterface } from "utils/interfaces";
import Input from "components/Input";
import { useFlightDirection } from "./useFlightDirection";

interface FlightDirectionProps {
  value: FlightDirectionInterface;
  fromPlaceholder: string;
  wherePlaceholder: string;
  debounceDelay: number;
  errors: Array<number>;
  fetchAirport: (query: string) => Promise<any>;
  onChange: (data: FlightsInterface, update: FLIGHTDIRECTION) => void;
}

const FlightDirection: React.FC<FlightDirectionProps> = ({
  value,
  fromPlaceholder,
  wherePlaceholder,
  errors,
  debounceDelay = 200,
  fetchAirport,
  onChange,
}) => {
  const [from, setFrom] = React.useState(value.from);
  const [to, setTo] = React.useState(value.to);

  const {
    result: fromOptions,
    isLoading: fromIsLoading,
    isError: fromIsError,
    error: fromError,
  } = useFlightDirection({
    debounceDelay,
    fetchOptions: fetchAirport,
    inputValue: from.name,
  });

  const {
    result: toOptions,
    isLoading: toIsLoading,
    isError: toIsError,
    error: toError,
  } = useFlightDirection({
    debounceDelay,
    fetchOptions: fetchAirport,
    inputValue: to.name,
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Input
          placeholder={fromPlaceholder}
          error={errors.indexOf(0) !== -1}
          value={from.name}
          loading={fromIsLoading}
          options={fromOptions}
          onChange={({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFrom({ name: target.value, value: "", entityId: "" });
            onChange(
              { name: target.value, value: "", entityId: "" },
              FLIGHTDIRECTION.FROM
            );
          }}
          onOptionSelect={(airport: FlightsInterface) => {
            setFrom(airport);
            onChange(airport, FLIGHTDIRECTION.FROM);
          }}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          focusable="false"
          style={{ cursor: "pointer" }}
          onClick={() => {
            const tempData = to;
            setTo(from);
            setFrom(tempData);
          }}
        >
          <path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM7 20l1.41-1.41L5.83 16H13v-2H5.83l2.58-2.59L7 10l-5 5 5 5z"></path>
        </svg>
        <Input
          placeholder={wherePlaceholder}
          error={errors.indexOf(1) !== -1}
          value={to.name}
          loading={toIsLoading}
          options={toOptions}
          onChange={({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTo({ name: target.value, value: "", entityId: "" });
            onChange(
              { name: target.value, value: "", entityId: "" },
              FLIGHTDIRECTION.TO
            );
          }}
          onOptionSelect={(airport: FlightsInterface) => {
            setTo(airport);
            onChange(airport, FLIGHTDIRECTION.TO);
          }}
        />
      </div>
      {fromIsError && <div style={{ color: "red" }}>{fromError}</div>}
      {toIsError && <div style={{ color: "red" }}>{toError}</div>}
    </div>
  );
};

export default FlightDirection;
