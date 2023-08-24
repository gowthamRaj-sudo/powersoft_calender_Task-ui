import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { instance } from "../Instance";

const SlotBox = ({
  open,
  slot,
  // selectedDay,
  setSelectedSlot,
  disbledButton,
  selectedSlot,
  recuiter,
  reload,
  noSlots,
}) => {
  // const [allBookings, setAllBookings] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const handleGetAllBookings = async () => {
    try {
      const response = await instance.get(`/api/getAllBookings`);
      if (response.status === 200) {
        // setAllBookings(response.data);/
        const booked = response.data.map((booking) => booking.calender_slot);
        setBookedSlots(booked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (reload) {
      handleGetAllBookings();
    }
    handleGetAllBookings();
  }, [selectedSlot, reload]);

  const handleSelectedSlots = (e) => {
    if (slot === e && noSlots) {
      open(false);
    } else {
      open(true);
      setSelectedSlot(e);
    }
  };

  return (
    <div>
      {noSlots ? (
        // <table>
        //   <tbody>
        //     {Array(Math.ceil(slot.length / 2))
        //       .fill()
        //       .map((_, rowIndex) => (
        //         <tr key={rowIndex}>
        //           {slot.slice(rowIndex * 2, rowIndex * 2 + 2).map((e) => (
        //             <td style={{ padding: "15px" }}>
        //               <Button
        //                 disabled={
        //                   !disbledButton ||
        //                   bookedSlots.includes(e) ||
        //                   slot === e
        //                 }
        //                 onClick={() => handleSelectedSlots(e)}
        //                 fullWidth
        //                 variant="outlined"
        //                 sx={{ background: "rgb(230, 239, 252)" }}
        //               >
        //                 {e}
        //               </Button>
        //             </td>
        //           ))}
        //         </tr>
        //       ))}
        //   </tbody>
        // </table>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            paddingTop: "50px",
          }}
        >
          {slot.map((e, i) => (
            <div style={{ padding: "8px" }} key={i}>
              <Button
                disabled={
                  !disbledButton || bookedSlots.includes(e) || slot === e
                }
                onClick={() => handleSelectedSlots(e)}
                fullWidth
                variant="outlined"
                sx={{
                  background:
                    !disbledButton || bookedSlots.includes(e) || slot === e
                      ? "rgb(230, 239, 252)" // Change to red color when disabled
                      : "#87F717",
                }}
              >
                {e}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <Typography
          sx={{
            marginTop: "20px",
            background: "#F6FF80", //#FFF380
            padding: "5px",
            borderRadius: "5px",
            color: "#8880FF",
            fontWeight: "700",
          }}
        >
          No Recuiter Available
        </Typography>
      )}
    </div>
  );
};

export default SlotBox;
