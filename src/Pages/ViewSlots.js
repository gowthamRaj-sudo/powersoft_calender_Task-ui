import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { instance } from "../Instance";

const ViewSlots = () => {
  const [allSlots, setAllSlots] = useState([]);
  const viewSlots = async () => {
    try {
      const response = await instance.get(`/api/getAllBookings`);
      if (response.status === 200) {
        setAllSlots(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    viewSlots();
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "800", padding: "15px" }}
      >
        Booked Slots
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "rgb(230, 230, 250)" }}>
              {Object.keys(allSlots[0] || {})?.map((title, i) => (
                <TableCell sx={{ textAlign: "center", fontWeight: "800" }}>
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allSlots.map((slots, i) => (
              <TableRow>
                <TableCell align="center">{slots.id}</TableCell>
                <TableCell align="center">
                  {slots.name.charAt(0).toUpperCase() + slots.name.slice(1)}
                </TableCell>
                <TableCell align="center">{slots.email}</TableCell>
                <TableCell align="center">{slots.mobileNumber}</TableCell>
                <TableCell align="center">{slots.calender_slot}</TableCell>{" "}
                <TableCell align="center">
                  {slots.recuiter.charAt(0).toUpperCase() +
                    slots.recuiter.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewSlots;
