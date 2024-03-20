import { Button, Stack, Typography } from "@mui/material";
import Modal from "./Modal";


interface SessionModalProps {
  open: boolean;
  handleAccept: () => void;
  handleClose: () => void;
}

const SessionModal = ({ open, handleAccept, handleClose }: SessionModalProps) => {
  return (
    <Modal open={open} handleClose={handleAccept}>
      <Stack
        sx={{
          margin: "0 15px 5px 15px",
          alignItems: "center",
          height: "150px",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#172D40",
            marginTop: "10px",
          }}
        >
          ¿Todavía estás ahí? 
        </Typography>
        <Stack direction="row" sx={{ marginTop: "35px" }}>
          <Button
            type="button"
            onClick={handleAccept}
            color="secondary"
            sx={{
              borderRadious: "12px",
              fontWeight: "bold",
              marginRight: "10px",
              width:"150px",
              padding: "10px"
            }}
            variant="contained"
            fullWidth
          >Si, sigo aqui</Button>
          <Button
            type="button"
            onClick={handleClose}
            color="error"
            sx={{
              borderRadious: "12px",
              fontWeight: "bold",
              width:"150px",
              padding: "10px"
            }}
            variant="contained"
            
            fullWidth
          >Cerrar sesión</Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default SessionModal;
