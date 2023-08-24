import React from "react";
// import SwicthComponent from "./SwicthComponent";
import { Typography } from "@mui/material";

const DaysConfigure = ({ Days }) => {
  return (
    <div>
      <table>
        {Days?.map((e, i) => (
          <tbody key={i}>
            <tr>
              <td style={{ padding: "15px" }}>{e.day}</td>
              <td>
                {e.day === "Sunday" ||
                e.day === "Friday" ||
                e.day === "Saturday" ? (
                  <Typography
                    sx={{
                      background: "rgba(255, 72, 66, 0.16)",
                      color: "rgb(183, 33, 54)",
                      textAlign: "center",
                      borderRadius: "5px",
                      fontWeight: "700",
                    }}
                  >
                    Leave
                  </Typography>
                ) : (
                  // <SwicthComponent checked={e.isActive} />
                  <Typography
                    sx={{
                      background: "rgba(84, 214, 44, 0.16)",
                      color: "rgb(34, 154, 22)",
                      textAlign: "center",
                      borderRadius: "5px",
                      fontWeight: "700",
                      padding: "3px",
                      fontSize: "14px",
                    }}
                  >
                    Avail slots
                  </Typography>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default DaysConfigure;
