import React from "react";
import { ERROR_MESSAGES } from "utils/constants";
import styles from "./style.module.scss";
import ErrorIcon from "@mui/icons-material/Error";

interface ErrorsProps {
  errors: Array<number>;
}

const Errors: React.FC<ErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return <></>;

  return (
    <div className={styles.wrapper}>
      {errors.map((error, index) => {
        return (
          <React.Fragment key={index}>
            <span
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
              }}
            >
              <ErrorIcon />
              {ERROR_MESSAGES[error]}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Errors;
