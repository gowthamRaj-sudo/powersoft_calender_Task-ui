import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AvaterCircle from "../Component/AvaterCircle";
import { AiFillBell } from "react-icons/ai";
import {
  BsFillAlarmFill,
  BsFillStopwatchFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import DatePickers from "../Component/DatePickers";
import { CheckBox } from "@mui/icons-material";
import recruiter from "../Assets/recruiter.svg";
import { instance } from "../Instance";
import ConfirmationModal from "../Component/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [recuiters, setRecuiters] = useState([]);

  const navigate = useNavigate();
  const getAllRecuiters = async () => {
    try {
      const response = await instance.get(`/api/recuiters`);
      if (response.status === 200) {
        setRecuiters(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllRecuiters();
  }, []);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState(null);
  const handleGoToPage = (e) => {
    setDates(e);
  };
  useEffect(() => {
    if (dates) {
      setOpen(true);
    }
  }, [dates]);
  return (
    <>
      <ConfirmationModal open={open} onClose={() => setOpen(false)} />
      <Grid container spacing={2} p={3}>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Card
            sx={{
              width: "100%",
              background: "#0c293a",
              height: "82vh",
              padding: "15px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "800",
                padding: "10px",
                textAlign: "center",
              }}
              variant="h5"
            >
              You need to book a Demo ?
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "white", padding: "10px", textAlign: "center" }}
            >
              Add guests to see when they are available{" "}
            </Typography>
            <Box sx={{ padding: "12px" }}>
              <TextField
                sx={{ background: "#1a3748", borderRadius: "15px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                          background: "white",
                          color: "grey",
                          fontWeight: "700",
                          "&:hover": {
                            background: "#37be3d",
                            color: "white",
                          },
                        }}
                        onClick={() => navigate("/bookDemo")}
                      >
                        Book Now
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* recuiter */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", float: "left", fontWeight: "600" }}
              >
                Recruiters ({recuiters.length})
              </Typography>
              <Typography
                sx={{
                  textDecoration: "underline",
                  padding: "5px",
                  color: "white",
                }}
              >
                View more
              </Typography>
            </Box>

            {/* requirter image */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "5px",
              }}
            >
              {recuiters.map((e, i) => (
                <Box key={i}>
                  <AvaterCircle name={e.name} />
                </Box>
              ))}
            </Box>

            <Box sx={{ padding: "15px" }}>
              <Card sx={{ background: "#1a3748", borderRadius: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box>
                      <Typography
                        sx={{ display: "flex", padding: "12px", color: "grey" }}
                      >
                        <BsFillAlarmFill size={20} color="white" /> &nbsp; Time
                      </Typography>
                      <Typography
                        sx={{
                          float: "left",
                          paddingLeft: "26px",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        &nbsp; 10.00 - 10.30 AM
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box>
                      {/* sescond*/}
                      <Typography
                        sx={{ display: "flex", padding: "12px", color: "grey" }}
                      >
                        <BsFillStopwatchFill size={20} color="white" /> &nbsp;
                        Duration
                      </Typography>
                      <Typography
                        sx={{
                          float: "left",
                          paddingLeft: "26px",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        &nbsp; 1 hour
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box>
                      {/* second*/}
                      <Typography
                        sx={{ display: "flex", padding: "12px", color: "grey" }}
                      >
                        <BsFillCameraVideoFill size={20} color="white" /> &nbsp;
                        Screening
                      </Typography>
                      <Typography
                        sx={{
                          float: "left",
                          paddingLeft: "26px",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        &nbsp; Zoom
                      </Typography>
                    </Box>
                  </Grid>
                  &nbsp;
                </Grid>
              </Card>
            </Box>
            <Box sx={{ float: "left", padding: "10px" }}>
              {" "}
              <Button
                variant="contained"
                sx={{
                  background: "#37be3d",
                  padding: "10px",
                  fontWeight: "700",
                  "&:hover": {
                    background: "white",
                    color: "grey",
                  },
                }}
                onClick={() => navigate("/bookDemo")}
              >
                Book a schulde
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <DatePickers value={dates} onChange={handleGoToPage} />
          <Card
            sx={{
              background: "#eef1f6",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                background: "#0c293a",
                width: "50px",
                borderRadius: "10px",
              }}
            >
              <AiFillBell size={50} color="white" />
            </Box>
            <Box sx={{ padding: "6%" }}>
              <Typography sx={{ color: "#1a3748", fontWeight: "900" }}>
                Notification
              </Typography>
              <Typography>Notify member by email</Typography>
            </Box>
            <Box>
              <CheckBox />
            </Box>
          </Card>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <img src={recruiter} alt="recruiter" style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeScreen;
