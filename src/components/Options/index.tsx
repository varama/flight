import { FLIGHTCLASSES, FLIGHTTYPES } from "utils/enums";

interface OptionsProps {
  value: string;
  options: Array<FLIGHTTYPES | FLIGHTCLASSES>;
  onSelect: (option: FLIGHTTYPES | FLIGHTCLASSES) => void;
}

const Options: React.FC<OptionsProps> = () => {
  return <div></div>;
};

export default Options;
