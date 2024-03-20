import * as React from "react";
import {
  Box,
  useMediaQuery,
  Button,
  Stack,
  Radio,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { theme } from "integrador/styles/material-theme";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/router";
import { Card } from "types/card.type";
import { getAmount, getCards, postPayment, tarjetaVencida} from "./utils";
import usePaymentService from "../contexts/usePaymentContext";

export type PaymentTransaction = {
  description: string,
  amount: number
}


export const PaymentMethod = () => {
  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const { state: paymentServiceState, dispatch: paymentServiceDispatch } =
  usePaymentService();

  let laptop;
  if (laptopOrDesktop && !desktop) laptop = true;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("Dinero");
  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>([]);

  const router = useRouter();

  const handleChangeCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCardId(event.target.value);
    setSelectedPaymentMethod("Tarjeta");
  };

  const handleChangePaymentMethod = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentMethod(event.target.value);
    if (event.target.value === "Dinero") {
      setSelectedCardId("");
    } else {
      setSelectedCardId(cards[0].id.toString());
    }
  };

  
  const submitPayment = async () => {
    const data : PaymentTransaction = {
      description: "Pagaste "+ paymentServiceState.method.service,
      amount: -paymentServiceState.method.amount
    }
    const token = localStorage.getItem("token");
    const account_id = localStorage.getItem("account_id")
    postPayment(token as string, account_id as string, data, onSuccess, onError)
  };

  const onSuccess = () =>{
    paymentServiceDispatch({type: "SET_STEP", payload: 2});
    paymentServiceDispatch({type: "SET_PAYMENT_METHOD", payload: {paymentMethod:selectedPaymentMethod, cardId: selectedCardId}});
  }

  const onError = () =>{
    paymentServiceDispatch({type: "SET_STEP", payload: 3});
  }

  const goToNuevaTarjeta = () => {
    router.push("/tarjetas/nuevaTarjeta");
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
    const accountId = localStorage.getItem("account_id");
    getCards(token, accountId, setCards, setLoading, setError);
    getAmount(token as string, setAmount, setLoading, setError);
  }, []);

  useEffect(() => {
    if (amount < paymentServiceState.method.amount) {
      if (cards.length > 0) {
        setSelectedPaymentMethod("Tarjeta");
        setSelectedCardId(cards[0].id.toString())
      }else{
        setSelectedPaymentMethod("");
      }
    }
  }, [amount, cards]);
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "90%",
          borderRadius: "10px",
          padding: "1.5rem 1.5rem 0 0.5rem",
        }}
      >
        <Typography
          variant={"h4"}
          color="secondary"
          sx={{ marginLeft: "12px" }}
        >
          Seleccionar método de pago
        </Typography>
        <Stack sx={{ flexDirection: "row" }}>
          <Radio
            checked={selectedPaymentMethod === "Dinero"}
            onChange={handleChangePaymentMethod}
            value={"Dinero"}
            name="radio-buttons"
            sx={{ marginTop: "15px" }}
            color="secondary"
            disabled={amount < paymentServiceState.method.amount}
          />
          <Stack
            sx={{
              backgroundColor: amount < paymentServiceState.method.amount ? "rgba(213 213 213 / 80%)" : "white",
              width: "100%",
              borderRadius: "10px",
              padding: "1rem 1rem 0.3rem 1rem",
              marginTop: "1rem",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant={"h5"} sx={{ marginBottom: "10px", color: amount < paymentServiceState.method.amount ? "#4e4c4c":"" }}>
              Pagar con dinero en cuenta
            </Typography>
            <Stack sx={{ width: "150px", alignItems: "center" }}>
              {!mobile && (
                <Typography
                  variant={"h4"}
                  sx={{
                    marginBottom: "2px",
                    fontSize: laptopOrDesktop
                      ? "15px !important"
                      : "14px !important",
                    textAlign: "center",
                    color: amount < paymentServiceState.method.amount ? "#4e4c4c":""
                  }}
                >
                  {amount < paymentServiceState.method.amount ? "Saldo insuficiente" : "Dinero disponible"}
                </Typography>
              )}
              <Typography
                variant={"h4"}
                sx={{
                  fontSize: laptopOrDesktop
                    ? "25px !important"
                    : "20px !important",
                  margin: "0",
                  alignSelf: mobile ? "flex-end" : "center",
                  color: amount < paymentServiceState.method.amount ? "#4e4c4c":""
                }}
              >
                ${amount}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack sx={{ flexDirection: "row" }}>
          {cards.length > 0 && (
            <Radio
              checked={selectedPaymentMethod === "Tarjeta"}
              onChange={handleChangePaymentMethod}
              value={"Tarjeta"}
              name="radio-buttons"
              sx={{ alignSelf: "flex-start", marginTop: "20px" }}
              color="secondary"
            />
          )}
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: "10px",
              padding: "1rem 1rem",
              marginTop: "1rem",
              marginLeft: cards.length > 0 ? "0px" : "40px",
            }}
          >
            {cards.length > 0 ? (
              <Typography variant={"h5"} sx={{ marginBottom: "15px" }}>
                Pagar con tarjeta
              </Typography>
            ) : (
              <Typography variant={"h5"} sx={{ marginBottom: "15px" }}>
                Agregá una tarjeta para pagar con tarjeta
              </Typography>
            )}
            <Typography variant={"h6"}>Tus tarjetas</Typography>
            {loading ? (
              <CircularProgress sx={{ marginTop: "1rem" }} />
            ) : error ? (
              <>Error al cargar tus tarjetas </>
            ) : cards.length == 0 ? (
              <>No tenés tarjetas asociadas</>
            ) : (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 200,
                  "& ul": { padding: 0 },
                }}
              >
                {cards.map((c) =>
                  tarjetaVencida(c.expiration_date) ? (
                    <></>
                  ) : (
                    <>
                      <ListItem
                        key={`item-${c.id}`}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          minHeight: "4rem",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <CircleIcon
                            color="secondary"
                            sx={{ marginRight: "1rem" }}
                          />
                          <Typography fontWeight="regular" variant={"h6"}>
                            Terminada en {c.number_id.toString().slice(-4)}
                          </Typography>
                        </Box>
                        <Radio
                          checked={selectedCardId === c.id.toString()}
                          onChange={handleChangeCard}
                          value={c.id}
                          name="radio-buttons"
                        />
                      </ListItem>
                      <Divider component="li" />
                    </>
                  )
                )}
              </List>
            )}
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: "0.75rem 0 0.75rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "20px",
            }}
            onClick={goToNuevaTarjeta}
          >
            <IconButton>
              <AddCircleOutlineIcon color="secondary" />
            </IconButton>
            <Typography
              color="secondary"
              variant={"body1"}
              sx={{ cursor: "pointer" }}
            >
              Nueva tarjeta
            </Typography>
          </Box>
          {!mobile && (
            <Button
              color="secondary"
              variant="contained"
              disabled={!selectedPaymentMethod}
              size="large"
              onClick={submitPayment}
            >
              Pagar
            </Button>
          )}
        </Box>
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
            size="large"
            onClick={submitPayment}
            disabled={!selectedPaymentMethod}
          >
            Pagar
          </Button>
        </Box>
      )}
    </>
  );
};
