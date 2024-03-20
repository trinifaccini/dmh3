import * as React from "react";
import { Box, useMediaQuery, Button, Stack, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { theme } from "integrador/styles/material-theme";
import { FC, useEffect, useState } from "react";
import usePaymentService from "../contexts/usePaymentContext";
import { getCard } from "./utils";

const PaymentResume = () => {
  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const { state: paymentServiceState, dispatch: paymentServiceDispatch } =
  usePaymentService();
  const [card, setCard] = useState(0)
  const router = useRouter();

  let laptop;
  if (laptopOrDesktop && !desktop) laptop = true;

  const onError = () =>{
    paymentServiceDispatch({type: "SET_STEP", payload: 3});
  }

  useEffect(() => {
    if(paymentServiceState.method.paymentMethod.paymentMethod === "Tarjeta" && paymentServiceState.method.paymentMethod.cardId){
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
      const accountId = localStorage.getItem("account_id");
      getCard(token as string, accountId as string, paymentServiceState.method.paymentMethod.cardId, setCard , onError); 
    }
  }, []);

  function formatDate() {

      const date = new Date()
      return (
        date.toISOString().substring(8, 10) +
        " de " +
        date.toLocaleString("es-AR", { month: "long" }) +
        " " +
        date.toISOString().substring(0, 4) +
        " a las " +
        date.toISOString().substring(11, 16)
      );
      return date
    }
  

  return (
     <Stack sx={{ width: '100%', alignItems: 'center'}}
                mt={laptopOrDesktop ? '1rem' : mobile ? '0' : '3rem'}
                spacing={laptop ? 1.3 : 2.5}
            >
      <Box
        sx={{
          backgroundColor: "secondary.main",
          width: "90%",
          height: "20%",
          borderRadius: "10px",
          padding: "1rem 1rem",
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Box width={"100%"} textAlign="center">
          <CheckCircleOutlineIcon
            fontSize="large"
            sx={{ width: "40px", height: "40px" }}
          />
        </Box>
        <Typography variant="h4" width={"100%"} textAlign="center">
          Ya realizaste tu pago.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "90%",
          borderRadius: "10px",
          padding: "1rem 1rem",
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            m: "1rem 2rem",
            marginLeft: "2rem",
          }}
        >
          <Box width={"100%"} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: mobile ? "column" : "row",
                alignItems: mobile ? "start" : "center",
                justifyContent: "space-between",
              }}
            >

              <Box>
                <Typography
                  color="gray"
                  variant={"subtitle2"}
                >{`${formatDate()} hs.`}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <Typography
                  color="secondary"
                  variant={"h5"}
                >{`$ ${paymentServiceState.method.amount},00`}</Typography>
              </div>
              <div>
                <Typography
                  color="secondary.light"
                  sx={{ fontSize: "16px" }}
                >{`Pagaste:`}</Typography>
                <Typography color="secondary" variant={"h4"}>{`${
                 paymentServiceState.method.service
                }`}</Typography>
              </div>
              <div>
                <Typography color="secondary.light" sx={{ fontSize: "16px", fontWeight:"600"}}>
                  Pagaste con:
                </Typography>
                <Typography color="secondary" variant={"body1"}>
                {paymentServiceState.method.paymentMethod.paymentMethod === "Dinero" ? "Dinero en cuenta": "Visa Terminada en " + card.toString().slice(-4)}
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid
        container
        sx={{ width: "90% !important", display: "flex", justifyContent: "end" }}
        columnSpacing={{ mobile: 2 }}
      >
        <Grid item mobile={6} laptop={3} sx={{ paddingLeft: "0px !important" }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              height: "64px",
              backgroundColor: "#CECECE",
              color: "#000000",
              textTransform: "unset",
              fontWeight: "bold",
            }}
            onClick={() => {
              router.push("/home");
              paymentServiceDispatch({type: "SET_STEP", payload: 0});
            }}
          >
            <h4>Ir al inicio</h4>
          </Button>
        </Grid>

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
          >
            <h4>Descargar comprobante</h4>
          </Button>
        </Grid>
      </Grid>
      </Stack>
  );
};

export default PaymentResume;
