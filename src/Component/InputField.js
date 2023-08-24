import {
  // Button,
  // IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const InputField = ({ label, onChange, value, email, mobile, normal }) => {
  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail =
    email && emailValidation.test(String(value).toLowerCase());
  const isValidMobile = mobile && value.replace(/[^0-9]/g, "").length === 10;
  // const isNameValid = normal && value;

  return (
    <div>
      <TextField
        label={label}
        value={value}
        onChange={(input) => {
          if (email) {
            onChange(input.target.value);
          } else if (mobile) {
            onChange(input.target.value.replace(/[^0-9]/g, "").slice(0, 10));
          } else if (normal) {
            onChange(input.target.value);
          }
        }}
        // error={email && !emailValidation.test(String(value).toLowerCase())}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                sx={{
                  fontWeight: "800",
                  background:
                    (normal && value) || isValidEmail || isValidMobile
                      ? "#37be3d"
                      : "#ff5349",
                  color: "white",
                  width: "20px",
                  borderRadius: "50%",
                }}
              >
                {(normal && value) || isValidEmail || isValidMobile ? "✔" : "!"}
              </Typography>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputField;
