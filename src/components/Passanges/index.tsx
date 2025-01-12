import useClickDetection from "hooks/useClickDetection";
import React from "react";
import { FLIGHTPASSANGERS } from "utils/enums";
import { PassangersInterface } from "utils/interfaces";
import styles from "./style.module.scss";

interface PassangersProps {
  value: PassangersInterface;
  total: number;
  maximumPassangers: number;
  onChange: (data: PassangersInterface, total: number) => void;
}

enum OPERATORS {
  ADD = "PLUS",
  SUBTRACT = "MINUS",
}

const Passangers: React.FC<PassangersProps> = ({
  value,
  total,
  maximumPassangers = 9,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [passangersCount, setPassangersCount] = React.useState(value);
  const [newTotal, setNewTotal] = React.useState(total);
  const passangersRef = React.useRef(null);
  const [error, setError] = React.useState("");
  useClickDetection(passangersRef, () => {
    setShowDropdown(false);
    setNewTotal(total);
    setPassangersCount(value);
  });

  const changePassangers = (
    count: OPERATORS,
    passangertype: FLIGHTPASSANGERS
  ) => {
    const addNumber = count === OPERATORS.ADD ? 1 : -1;
    const totalPassangers = Object.keys(value).reduce((prev, passanger) => {
      const passangerID = passanger as FLIGHTPASSANGERS;
      return prev + passangersCount[passangerID].count;
    }, addNumber);

    setNewTotal(totalPassangers);

    if (totalPassangers > maximumPassangers) {
      setError(
        `Sorry we do not support more then ${maximumPassangers} passangers.`
      );
    } else {
      setError("");
    }

    setPassangersCount((previousData) => {
      return {
        ...previousData,
        [passangertype]: {
          ...previousData[passangertype],
          count: previousData[passangertype].count + addNumber,
        },
      };
    });
  };

  return (
    <div ref={passangersRef} style={{ width: "fit-content" }}>
      <div
        className={styles.title}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        {total}
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
          {Object.keys(value).map((passanger) => {
            const passangerID = passanger as FLIGHTPASSANGERS;
            const passangerData = value[passangerID];
            const count = passangersCount[passangerID].count;
            return (
              <div
                key={passangerData.subtitle}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "40px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{passangerData.title}</div>
                  <div className={styles.count}>
                    <button
                      className={
                        count ===
                        (typeof passangerData.minimum !== "undefined"
                          ? passangerData.minimum
                          : 0)
                          ? styles.disabled
                          : ""
                      }
                      onClick={() => {
                        count !==
                          (typeof passangerData.minimum !== "undefined"
                            ? passangerData.minimum
                            : 0) &&
                          changePassangers(OPERATORS.SUBTRACT, passangerID);
                      }}
                    >
                      -
                    </button>
                    {count}
                    <button
                      className={count === 9 ? styles.disabled : ""}
                      onClick={() => {
                        count !== 9 &&
                          changePassangers(OPERATORS.ADD, passangerID);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                {passangerData.subtitle && (
                  <div className={styles.subtitle}>
                    <div>{passangerData.subtitle}</div>
                  </div>
                )}
              </div>
            );
          })}
          {!error && (
            <div className={styles.bottomButtons}>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  setNewTotal(total);
                  setPassangersCount(value);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onChange(passangersCount, newTotal);
                }}
              >
                Done
              </button>
            </div>
          )}
          {error && <div className={styles.error}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Passangers;
