import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FlightCalendarInterface } from "utils/interfaces";
import { FLIGHTTYPES } from "utils/enums";

interface FlightCalendarProps {
  dates: FlightCalendarInterface;
  tripType: FLIGHTTYPES;
  onChange: (calendar: FlightCalendarInterface) => void;
}

const FlightCalendar: React.FC<FlightCalendarProps> = ({
  dates,
  tripType,
  onChange: updateChange,
}) => {
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(
    dayjs(dates.dateFrom)
  );
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs(dates.dateTo));

  return (
    <div style={{ display: "flex" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dateFrom}
          minDate={dayjs(new Date())}
          onChange={(newValue) => {
            setDateFrom(newValue);
            updateChange({
              dateFrom: newValue?.toString() || "",
              dateTo: dateTo?.toString() || "",
            });
          }}
        />
        {tripType === FLIGHTTYPES.ROUND && (
          <DatePicker
            value={dateTo}
            minDate={dateFrom || undefined}
            onChange={(newValue) => {
              setDateTo(newValue);
              updateChange({
                dateFrom: dateFrom?.toString() || "",
                dateTo: newValue?.toString() || "",
              });
            }}
          />
        )}
      </LocalizationProvider>
    </div>
  );
};

export default FlightCalendar;
