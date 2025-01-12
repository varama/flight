import { FLIGHTTYPES } from "utils/enums";
import { FlightCalendarInterface } from "utils/interfaces";

interface FlightCalendarProps {
  dates: FlightCalendarInterface;
  tripType: FLIGHTTYPES;
  onChange: (calendar: FlightCalendarInterface) => void;
}

const FlightCalendar: React.FC<FlightCalendarProps> = () => {
  return <div></div>;
};

export default FlightCalendar;
