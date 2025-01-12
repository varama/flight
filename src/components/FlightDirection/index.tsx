import { FLIGHTDIRECTION } from "utils/enums";
import { FlightDirectionInterface, FlightsInterface } from "utils/interfaces";

interface FlightDirectionProps {
  value: FlightDirectionInterface;
  fromPlaceholder: string;
  wherePlaceholder: string;
  debounceDelay: number;
  fetchAirport: (query: string) => Promise<any>;
  onChange: (data: FlightsInterface, update: FLIGHTDIRECTION) => void;
}

const FlightDirection: React.FC<FlightDirectionProps> = () => {
  return <div></div>;
};

export default FlightDirection;
