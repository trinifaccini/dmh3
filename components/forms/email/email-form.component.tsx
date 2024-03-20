import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ControlledTextInput from "../input/controlled-text-input.component";
import { Email } from "types/email.types";
import { EmailFormSchema } from "../schemas/email-schema";
import EditIcon from "@mui/icons-material/Edit";
import useProfile from "integrador/components/contexts/useProfile";

const NewEmailform = () => {
  const message = {};
  const [email, setemail] = useState("");
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useProfile();

  const sendMail = async () => {
    //e.preventDefault();
    console.log("call");
    await fetch(`/api/email`, {
      method: "POST",
      body: JSON.stringify({
        message: "Send Mail",
        email: email,
        subject: "Solicitud cambio de email Digital Money House",
        user: state.user.firstname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.json();
        console.log(response);
      })
      .catch(function (err) {
        console.log("error " + err);
      });
  };

  const methods = useForm<Email>({
    resolver: yupResolver(EmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { setFocus, handleSubmit } = methods;

  const onSubmit = (data: Email) => {
    console.log(email);
    setemail(data.email);
    setOpen(false);
    console.log("Submit");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (email) {
      sendMail();
      console.log("send");
    }
    console.log(email);
  }, [email]);

  const onError = () => console.log("Erroneo");

  return (
    <div>
      <Tooltip title="Editar">
        <IconButton onClick={handleClickOpen}>
          <EditIcon fontSize="small" sx={{ color: "grey" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quieres cambiar tu email?</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#172D40",
              marginTop: "10px",
            }}
          >
            Enviaremos un email para que puedas confirmarlo.
          </Typography>
          <FormProvider {...methods}>
            <ControlledTextInput name="email" placeholder="Email" type="text" />
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit(onSubmit, onError)}>
            Cambiar email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewEmailform;
