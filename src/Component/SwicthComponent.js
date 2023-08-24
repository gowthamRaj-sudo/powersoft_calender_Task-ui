import { Switch } from "@mui/material";
import React from "react";
// import styled from "styled-components";

const SwicthComponent = ({ checked }) => {
  return (
    <div>
      <Switch checked={checked} />
    </div>
  );
};

export default SwicthComponent;
