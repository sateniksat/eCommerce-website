import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
// import { Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "80%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  overflow: "auto",
  p: 4,
};

export default function ModalPage(Component) {
  return function WithModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <Box>
        <Button
          variant={props.buttonVarient}
          onClick={handleOpen}
          color={props.buttonColor}
          sx={{ ml: 2 }}
        >
          {props.title}
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          // sx={{overflow:"scroll",}}
        >
          <Fade in={open}>
            <Box sx={{ ...style, width: props.ModalWidth }}>
              <Box
                dir="rtl"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* <Typography variant="h5" gutterBottom component="Box">
                {props.title}
                </Typography> */}
                <h2> {props.title}</h2>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ maxHeight: "70vh" }}>
                <Component handleClose={handleClose} {...props} />
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    );
  };
}
