export interface PassangerInterface {
  count: number;
  minimum?: number;
  title: string;
  subtitle: string;
}

export interface PassangersInterface {
  adults: PassangerInterface;
  children: PassangerInterface;
  infants: PassangerInterface;
}

export interface FlightsInterface {
  name: string;
  value: string;
  entityId: string;
}

export interface FlightCalendarInterface {
  dateFrom: string;
  dateTo: string;
}

export interface FlightDirectionInterface {
  from: FlightsInterface;
  to: FlightsInterface;
}

export interface GetFlightsProps {
  originID: string;
  destinationID: string;
  originEntityID: string;
  destinationEntityID: string;
  date: string;
  returnDate?: string;
  cabinClass: string;
  adults: number;
  childrens: number;
  infants: number;
}
