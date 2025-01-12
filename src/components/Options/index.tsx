import useClickDetection from "hooks/useClickDetection";
import React from "react";
import { FLIGHTCLASSES, FLIGHTTYPES } from "utils/enums";
import styles from "./style.module.scss";

interface OptionsProps {
  value: string;
  options: Array<FLIGHTTYPES | FLIGHTCLASSES>;
  onSelect: (option: FLIGHTTYPES | FLIGHTCLASSES) => void;
}

const Options: React.FC<OptionsProps> = ({ value, options, onSelect }) => {
  const optionsRef = React.useRef(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  useClickDetection(optionsRef, () => {
    setShowDropdown(false);
  });
  return (
    <div ref={optionsRef} style={{ width: "fit-content" }}>
      <div
        className={styles.title}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        {value}
        <svg
          viewBox="7 10 10 5"
          focusable="false"
          style={{ width: 10, height: 10 }}
        >
          <polygon
            stroke="none"
            fillRule="evenodd"
            points="7 10 12 15 17 10"
          ></polygon>
        </svg>
      </div>
      {showDropdown && (
        <div className={styles.dropdown}>
          {options.map((option) => {
            return (
              <div
                className={value === option ? styles.active : ""}
                key={option}
                onClick={() => {
                  onSelect(option);
                  setShowDropdown(false);
                }}
              >
                {value === option ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                  </svg>
                ) : (
                  <div style={{ width: 20 }}></div>
                )}
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Options;
