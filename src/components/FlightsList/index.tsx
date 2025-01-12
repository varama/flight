import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTime } from "utils/getDate";
import styles from "./style.module.scss";
import { getFlightData } from "utils/getFlightData";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

interface FlightsListProps {
  flights: any;
  loading: boolean;
  isIdle: boolean;
  isError: boolean;
  error: string;
}

const FlightsList: React.FC<FlightsListProps> = ({
  flights,
  loading,
  isError,
  isIdle,
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
      {loading && <div className={styles.wrapper}>Loading...</div>}
      {isError && (
        <div className={styles.wrapper} style={{ color: "red" }}>
          {error}
        </div>
      )}
      {(itineraries || []).length === 0 && !isIdle && !loading && (
        <div className={styles.wrapper}>No Data</div>
      )}
      <div style={{ maxHeight: 500, overflowY: "auto", padding: 10 }}>
        {(itineraries || []).map((flight: any) => {
          const flightFrom = getFlightData(flight?.legs[0]);
          const flightBack = getFlightData(flight?.legs[1]);
          const flightBackExists = !!flight?.legs[1];
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
                  <div style={{ display: "flex", gap: 5 }}>
                    <img src={flightFrom.logo} width={30} alt="Flight" />
                    {flightBackExists && (
                      <img src={flightBack.logo} width={30} alt="Flight" />
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <span>{getTime(flightFrom.departure)}</span>{" "}
                        <span>-</span>
                        <span>{getTime(flightFrom.arrival)}</span>
                      </span>
                      {flightBackExists && (
                        <>
                          <SyncAltIcon />
                          <span
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            <span>{getTime(flightBack.departure)}</span>
                            <span> - </span>
                            <span>{getTime(flightBack.arrival)}</span>
                          </span>
                        </>
                      )}
                    </div>
                    <span>{flightFrom.flightName}</span>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{ gap: 10, display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={flightFrom.logo} width={30} alt="Flight" />
                  <div>
                    {flightFrom.origin} - {flightFrom.destination}
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <span>{getTime(flightFrom.departure)}</span>
                    <span>-</span>
                    <span>{getTime(flightFrom.arrival)}</span>
                  </span>
                </div>
                {flightBackExists && (
                  <>
                    <Divider />

                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <img src={flightBack.logo} width={30} alt="Flight" />
                      <div>
                        {flightBack.origin} - {flightBack.destination}
                      </div>
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <span>{getTime(flightBack.departure)}</span>{" "}
                        <span>-</span>
                        <span>{getTime(flightBack.arrival)}</span>
                      </span>
                    </div>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FlightsList;
