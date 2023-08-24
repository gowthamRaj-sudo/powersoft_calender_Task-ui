import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import DatePickers from "../Component/DatePickers";
import Logo from "../Assets/Logo.png";
import DaysConfigure from "../Component/DaysConfigure";
import SlotBox from "../Component/SlotBox";
import InformationModal from "../Component/InformationModal";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { instance } from "../Instance";
import { useNavigate } from "react-router-dom";

const BookDemo = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  // slot Creating
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reloadGetApi, setReloadGetApi] = useState(false);
  // console.log(selectedDate);
  const handleDate = (value) => {
    setSelectedDate(value);
    const selectedDayValue = dayjs(value).day();
    if (
      selectedDayValue === 5 ||
      selectedDayValue === 6 ||
      selectedDayValue === 0
    ) {
      setSlots([]);
      setSelectedDay(selectedDayValue);

      Swal.fire({
        icon: "error",
        title: "Leave",
        text: `${
          (selectedDayValue === 5 && "Friday") ||
          (selectedDayValue === 6 && "Saturday") ||
          (selectedDayValue === 0 && "Sunday")
        } is no slots availble !`,
      });

      return;
    }
    const currentHour = new Date().getHours();
    // const currentMinute = new Date().getMinutes();
    const isAM = currentHour < 12;
    // Generate 1-hour time slots for the selected date
    const slotsForSelectedDate = [];
    for (let i = currentHour; i < currentHour + 6; i++) {
      // for (let j = 0; j < 6; j++) {
      // Loop for 0 and 30 minutes
      const slotTime = value
        .set("hour", i % 24)
        .set("minute", 0) //j * 30
        .set("second", 0);
      const hour = slotTime.$d.getHours() % 12 || 12;
      const minute = slotTime.$d.getMinutes();
      const ampm = (i < 12 && isAM) || (i >= 12 && !isAM) ? "AM" : "PM";
      const formattedTime = `${hour}:${
        minute < 10 ? "0" : ""
      }${minute} ${ampm}`;
      slotsForSelectedDate.push(formattedTime);
      // }
    }

    setSlots(slotsForSelectedDate);
  };

  useEffect(() => {
    handleDate(dayjs(selectedDate));
    // eslint-disable-next-line
  }, []);
  const days = [
    { day: "Sunday", isActive: false },
    { day: "Monday", isActive: true },
    { day: "Tuesday", isActive: true },
    { day: "Wednesday", isActive: true },
    { day: "Thursday", isActive: true },
    { day: "Friday", isActive: false },
    { day: "Saturday", isActive: false },
  ];

  const [recuiter, setRecuiter] = useState([]);
  // const [rec, setRec] = useState(false);

  const getAllRecuiters = async () => {
    try {
      const response = await instance.get(`/api/recuiters`);
      if (response.status === 200) {
        setRecuiter(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllRecuiters();
  }, [selectedSlot]);
  const anyRecruiterActive = recuiter.some((rec) => rec.isActive === 1);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InformationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        slotsAvail={selectedSlot}
        recuiter={recuiter}
        reload={setReloadGetApi}
        // load={setReloadGetApi}

        reloadGetApi={reloadGetApi}
        // api={setRec}
      />
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid
            item
            xl={slots.length === 0 ? 12 : 6}
            lg={slots.length === 0 ? 12 : 6}
            md={slots.length === 0 ? 12 : 6}
            sm={12}
            xs={12}
          >
            <Box>
              <img src={Logo} alt="logo" />
            </Box>

            <Typography variant="p">
              My app would like to schuedule an interview with you! Pick a time
              & date
            </Typography>
            <Divider />
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                background: "rgb(230, 239, 252)",
                borderRadius: "5px",
                color: "#1976d2",
                fontWeight: "800",
              }}
            >
              <AiOutlineClockCircle /> &nbsp; Meeting as 1 hour
            </Typography>
            <DatePickers
              value={selectedDate}
              onChange={(e) => handleDate(e)}
              minDate={new Date()}
            />
          </Grid>
          {slots.length > 0 ? (
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Box sx={{ marginTop: "16%" }}>
                {" "}
                <Typography variant="p" sx={{ fontWeight: "700" }}>
                  Pick a Date & Time
                </Typography>
              </Box>
              <Divider />

              <>
                <Typography
                  sx={{
                    padding: "12px",
                    background: "rgb(230, 239, 252)",
                    borderRadius: "5px",
                    color: "#1976d2",
                    fontWeight: "800",
                  }}
                >
                  Select a Date
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <DaysConfigure Days={days} />
                  </Box>

                  <Box>
                    <SlotBox
                      disbledButton={anyRecruiterActive}
                      selectedSlot={selectedSlot}
                      open={setOpenModal}
                      slot={slots}
                      selectedDay={selectedDay}
                      setSelectedSlot={setSelectedSlot}
                      recuiter={recuiter}
                      reload={reloadGetApi}
                      noSlots={anyRecruiterActive}
                    />
                  </Box>
                </Box>
              </>
            </Grid>
          ) : null}
        </Grid>

        <Box sx={{ padding: "15px", float: "right" }}>
          {" "}
          <Button
            disabled={!slots.length > 0}
            variant="contained"
            onClick={() => navigate("/viewSlots")}
          >
            View Slots
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default BookDemo;
