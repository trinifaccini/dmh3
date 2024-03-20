import { Button, Stack, Typography } from "@mui/material";
import Modal from "../../modal/Modal";

interface SuccessModalProps {
  open: boolean;
  handleAccept: () => void;
}

const SuccessModal = ({ open, handleAccept }: SuccessModalProps) => {
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
          La tarjeta se ha agregado exitosamente.
        </Typography>
        <Stack direction="row" sx={{ marginTop: "35px" }}>
          <Button
            type="button"
            onClick={handleAccept}
            color="secondary"
            sx={{
              borderRadious: "12px",
              padding: "16.5px 14px",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
          >Aceptar</Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default SuccessModal;
