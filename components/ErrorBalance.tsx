import * as React from "react";
import { Box, useMediaQuery, Button, Stack, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { theme } from "integrador/styles/material-theme";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import usePaymentService from "./contexts/usePaymentContext";

const ErrorBalance = () => {
  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  
  const { state: paymentServiceState, dispatch: paymentServiceDispatch } =
  usePaymentService();

  let laptop;
  if (laptopOrDesktop && !desktop) laptop = true;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "90%",
          borderRadius: "10px",
          padding: "1rem 1rem",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "42%",
        }}
      >
          <CancelOutlinedIcon
            sx={{ color: "red", width: mobile ?"80px":"100px", height: mobile ?"80px":"100px" }}
          />

          <Typography color="white" variant={"h1"} fontSize={!laptopOrDesktop ? "1.5rem !important": "2.5rem !important"} textAlign={"center"}>
            Hubo un problema con tu pago
          </Typography>

          <hr style={{ width: "90%", border: "1px #626262 solid" }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            //   height: "80px"
            }}
          >
            <Typography color="#CECECE" variant={"h6"} fontSize={"1rem"} textAlign={"center"}>
              {" "}
              Puede deberse a fondos insuficientes.{" "}
            </Typography>
            <Typography color="#CECECE" variant={"h6"} fontSize={"1rem"} textAlign={"center"}>
              {" "}
              Comunicate con la entidad emisora de la tarjeta
            </Typography>
          </Box>
      </Box>

      <Grid
        container
        sx={{
          width: "90% !important",
          display: "flex",
          justifyContent: "end",
          marginTop: "20px",
        }}
        columnSpacing={{ mobile: 2 }}
      >
        <Grid item mobile={6} laptop={3}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            sx={{
              height: "64px",
              textTransform: "unset",
              fontWeight: "bold",
            }}
            onClick={() => paymentServiceDispatch({type: "SET_STEP", payload: 1})}
          >
            Volver a intentarlo
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ErrorBalance;
