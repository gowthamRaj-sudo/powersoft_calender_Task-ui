import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import "../App.css";
import { Typography } from "@mui/material";
const DatePickers = ({ value, onChange, minDate }) => {
  const startOfWeek = dayjs(value).startOf("week");

  const formatWeeklyRange = () => {
    const endOfWeek = dayjs(value).endOf("week");
    return `${startOfWeek.format("MMM D")} - ${endOfWeek.format("MMM D")}`;
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h6" gutterBottom>
          {formatWeeklyRange()} {/* Display the formatted weekly range */}
        </Typography>
        <StaticDatePicker
          value={dayjs(value)}
          onChange={onChange}
          minDate={dayjs(minDate)}
          className="custom-static-datepicker"
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickers;
