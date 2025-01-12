import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTime } from "utils/getDate";

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
  const { data } = flights || {};
  const { itineraries } = data || {};

  return (
    <div
      style={{
        margin: "auto",
        marginTop: 20,
        maxWidth: 800,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {loading && <div>Loading...</div>}
      {isError && <div style={{ color: "red" }}>{error}</div>}
      {(itineraries || []).map((flight: any) => {
        return (
          <Accordion key={flight.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: 15,
                }}
              >
                <img
                  src={flight?.legs[0]?.carriers?.marketing[0]?.logoUrl || ""}
                  width={30}
                  alt="Flight"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>
                    {getTime(flight?.legs[0]?.departure)} -
                    {getTime(flight?.legs[0]?.arrival)}
                  </span>
                  <span>{flight?.legs[0]?.carriers?.marketing[0]?.name}</span>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {flight?.legs[0]?.origin.city} -{" "}
              {flight?.legs[0]?.destination.city}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default FlightsList;
