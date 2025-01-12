export const getFlightData = (data: any = {}) => {
  const result = {
    departure: data.departure,
    arrival: data.arrival,
    logo: data.carriers?.marketing[0]?.logoUrl || "",
    flightName: data.carriers?.marketing[0]?.name || "",
    origin: data.origin?.city,
    destination: data.destination?.city,
  };
  return result;
};
