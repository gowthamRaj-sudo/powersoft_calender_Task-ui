import { Button, Card, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import InputField from "./InputField";
import { instance } from "../Instance";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const InformationModal = ({
  open,
  onClose,
  slotsAvail,
  recuiter,
  reload,
  reloadGetApi,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [currentRecruiterId, setCurrentRecruiterId] = useState(1);

  const bookAslotsForDemo = async () => {
    try {
      if (recuiter.length === 0) {
        reload(true);
        toast.error("No active recruiters available.");
        open(false);
        console.log("No recruiters available.");
        return;
      }
      const anyRecruiterActive = recuiter.some((rec) => rec.isActive === 1);

      if (!anyRecruiterActive) {
        toast.error("No active recruiters available.");
        open(false);
        console.log("No active recruiters available.");
        reload(true);

        return;
      }
      const selectedRecuiter = recuiter.find(
        (rec) => rec.id === currentRecruiterId
      );
      // console.log("currentRecruiterId:", currentRecruiterId);
      // console.log(
      //   "Recruiter IDs:",
      //   recuiter.map((rec) => rec.id)
      // );
      if (!selectedRecuiter) {
        console.log("Recruiter not found.");
        return;
      }

      const response = await instance.post(`/api/bookAdemo`, {
        name: name,
        email: email,
        mobileNumber: mobile,
        calender_slot: slotsAvail,
        recuiter: selectedRecuiter.name,
      });
      if (response.status === 200) {
        await instance.post(
          `/api/changeRecuiterStatus?isActive=0&id=${selectedRecuiter.id}`
        );
        reload(true);

        if (reloadGetApi) {
          reload(false);
        }
        // console.log(reload);
        onClose(false);
        // console.log(response.data);
        // recuiterAvil();
        setName("");
        setEmail("");
        setMobile("");
        Swal.fire({
          icon: "success",
          text: "slot booked successfully !",
        });
        const currentIndex = recuiter.findIndex(
          (rec) => rec.id === currentRecruiterId
        );
        const nextIndex = (currentIndex + 1) % recuiter.length;

        setCurrentRecruiterId(recuiter[nextIndex].id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Card
          sx={{
            width: "400px",
            textAlign: "center",
            padding: "15px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: "center", padding: "15px" }}
          >
            UserDetails
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <InputField
                label={"Name"}
                normal
                value={name}
                onChange={setName}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <InputField
                label={"Mobile Number"}
                mobile
                value={mobile}
                onChange={setMobile}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <InputField
                label={"Email"}
                email
                value={email}
                onChange={setEmail}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              {"Booking Slot : "}
              <Button
                variant="outlined"
                sx={{ background: "rgb(230, 239, 252)" }}
              >
                {slotsAvail}
              </Button>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Button
                sx={{
                  float: "left",
                  background: "#1a3748",
                  fontWeight: "600",
                  "&:hover": {
                    background: "#37be3d",
                  },
                }}
                variant="contained"
                onClick={bookAslotsForDemo}
                disabled={!name || !email || !mobile}
              >
                Book a slot
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
};

export default InformationModal;
