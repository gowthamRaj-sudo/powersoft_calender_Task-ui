import { Box, Button, Card, Modal, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const handleMove = () => {
    navigate("/bookDemo");
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
          <Card
            sx={{
              width: "370px",
              height: `190px`,
            }}
          >
            <Box sx={{ textAlign: "center", paddingTop: "15px" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                Confirmation
              </Typography>
              <Typography sx={{ paddingTop: "20px" }}>
                Do you want to Book a slot
              </Typography>
              <Box sx={{ paddingTop: "28px" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "#37be3d",
                    "&:hover": { background: "#0c293a" },
                    fontWeight: "700",
                  }}
                  onClick={handleMove}
                >
                  Book a demo
                </Button>
              </Box>
            </Box>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
