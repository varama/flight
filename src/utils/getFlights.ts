import { client } from "./apiClient";
import { GetFlightsProps } from "./interfaces";

const api = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";

export const getAirport = async (query: string) =>
  client(`${api}/searchAirport?query=${query}&locale=en-US`);

export const getFlights = async ({
  originID,
  destinationID,
  originEntityID,
  destinationEntityID,
  date,
  returnDate,
  cabinClass,
  adults,
  childrens,
  infants,
}: GetFlightsProps) =>
  client(
    `${api}/searchFlights?originSkyId=${originID}&destinationSkyId=${destinationID}&originEntityId=${originEntityID}&destinationEntityId=${destinationEntityID}&date=${date}${
      returnDate ? `&returnDate=${returnDate}` : ``
    }&cabinClass=${cabinClass}&adults=${adults}&childrens=${childrens}&infants=${infants}&sortBy=best&currency=USD&market=en-US&countryCode=US`
  );
