import * as React from "react";
import { Box, useMediaQuery, Button, Stack, Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import { theme } from "integrador/styles/material-theme";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePaymentService from "../contexts/usePaymentContext";
import { POST_ACCOUNT_NUMBER } from "integrador/pages/api/api";
import ErrorAccountNumber from "./ErrorAccountNumber";

export const ChargeServiceNumber = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const { state: paymentServiceState, dispatch: paymentServiceDispatch } =
    usePaymentService();

  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountError, setAccountError] = useState<boolean>(false);

  let laptop;
  if (laptopOrDesktop && !desktop) laptop = true;

  const router = useRouter();

  const submitAccountNumber = async () => {
    if(accountNumber === "31313131313"){
      setAccountError(true)
    }else{
      setAccountError(false)
      const token = localStorage.getItem("token");
    const request = await fetch(POST_ACCOUNT_NUMBER, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token as string,
      },
    })
      .then(async (res) => {
        if(res.status=== 200){
          paymentServiceDispatch({type: "SET_ACCOUNT", payload: accountNumber});
          paymentServiceDispatch({type: "SET_AMOUNT", payload: Math.floor(Math.random() * (5000 - 1000 + 1) + 1000)});
          paymentServiceDispatch({type: "SET_STEP", payload: 1});
        }
      })
      .catch((error) => {
        console.warn(error.message);
      });
    }
  };

  if(accountError){
    return <ErrorAccountNumber setAccountError={setAccountError}/> 
  }

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "start",
        }}
        mt={laptopOrDesktop ? "1rem" : mobile ? "0" : "3rem"}
        spacing={laptop ? 1.3 : 2.5}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: "90%",
            borderRadius: "10px",
            padding: "1.5rem 1.5rem",
          }}
        >
          <Typography variant={"h4"} color="secondary">
            Número de cuenta sin el primer 2:
          </Typography>

          <Box
            sx={{
              backgroundColor: "white",
              width: laptopOrDesktop ? "50%" : "100%",
              borderRadius: "10px",
              padding: "1rem 1rem",
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              type="number"
              size="medium"
              sx={{
                padding: "0",
                margin: "0",
                fontSize: mobile ? "12pt" : "13pt",
                height: "100%",
                width: "100%",
                [`& .MuiInputBase-input`]: { height: "100%", padding: "0" },
              }}
              placeholder={"Número de cuenta"}
              disableUnderline={true}
              onChange={(event) => setAccountNumber(event.target.value)}
            />
          </Box>
          <Typography
            sx={{ color: "white", fontSize: "15px", marginTop: "15px" }}
          >
            Son 11 números sin espacios, sin el "2" inicial. Agregá ceros
            adelante si tenés menos.
          </Typography>
          {!mobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                m: "0.75rem 0 0.75rem",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                disabled={accountNumber.length != 11}
                size="large"
                sx={{
                  width: laptopOrDesktop ? "20%" : "100%",
                  padding: laptopOrDesktop ? "default" : "1rem 0",
                }}
                onClick={submitAccountNumber}
              >
                Continuar
              </Button>
            </Box>
          )}
        </Box>

        {mobile && (
          <Box
            sx={{
              display: "flex",
              width: "90%",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              disabled={accountNumber.length != 11}
              size="large"
              sx={{ width: "50%" }}
              onClick={submitAccountNumber}
            >
              Continuar
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default ChargeServiceNumber;
