import React from "react";
interface FlightsListProps {
  flights: any;
  loading: boolean;
  isError: boolean;
  error: string;
}

const FlightsList: React.FC<FlightsListProps> = ({
  flights,
  loading,
  isError,
  error,
}) => {
  return <div>Flights List</div>;
};

export default FlightsList;
