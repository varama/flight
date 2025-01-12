import React from "react";
import {
  Grid2,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import { AirportInterface, FlightsInterface } from "utils/interfaces";
import styles from "./style.module.scss";
import useClickDetection from "hooks/useClickDetection";

interface InputProps
  extends React.HTMLAttributes<HTMLTextAreaElement | HTMLInputElement> {
  placeholder: string;
  value: string;
  error: boolean;
  loading: boolean;
  options: Array<any>;
  onOptionSelect: (airport: FlightsInterface) => void;
}

const Input = ({
  placeholder,
  value,
  error,
  loading,
  options,
  onChange,
  onOptionSelect,
}: InputProps) => {
  const [showDropdown, setShowDropdown] = React.useState(true);
  const directionRef = React.useRef(null);
  useClickDetection(directionRef, () => {
    setShowDropdown(false);
  });
  return (
    <div ref={directionRef}>
      <TextField
        error={error}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        style={{ maxWidth: 150 }}
        onClick={() => {
          setShowDropdown(true);
        }}
        onChange={onChange}
      />
      {showDropdown && options.length > 0 && (
        <Grid2>
          <div className={styles.dropdown}>
            <List>
              {options.map((airport: AirportInterface) => {
                return (
                  <ListItemButton
                    key={airport.entityId}
                    onClick={() => {
                      setShowDropdown(false);
                      onOptionSelect({
                        value: airport.skyId,
                        name: airport.presentation.title,
                        entityId: airport.entityId,
                      });
                    }}
                  >
                    <ListItemIcon>
                      <FlightIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={airport.presentation.title}
                      secondary={airport.skyId}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </div>
        </Grid2>
      )}
      <div style={{ height: 30, position: "absolute" }}>
        {loading ? "Loading..." : ""}
      </div>
    </div>
  );
};

export default Input;
