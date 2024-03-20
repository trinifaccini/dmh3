import ControlledTextInput from "../input/controlled-text-input.component";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { FC, useEffect, useState } from "react";
import { PaymentSchema } from "../schemas/nueva-tarjeta-schema";
import { theme } from "integrador/styles/material-theme";
import { useRouter } from "next/router";
import SuccessModal from "./SuccessModal";
import useModal from "integrador/components/hooks/useModal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { GET_CARDS } from "integrador/pages/api/api";

export type PaymentInformationData = {
  number: string;
  name: string;
  expiryYear: string;
  expiryMonth: string;
  cvc: string;
  focus: Focused | undefined;
};

type CardData = {
  number_id: number;
  first_last_name: string;
  expiration_date: string;
  cod: number;
};

const NuevaTarjetaForm: FC = () => {
  const methods = useForm<PaymentInformationData>({
    mode: "onChange",
    resolver: yupResolver(PaymentSchema),
    defaultValues: {
      number: "",
      name: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
      focus: "number",
    },
  });

  const { setFocus, handleSubmit, watch, setValue, formState } = methods;
  const [error, setError] = useState<string>("");
  const [openSuccessModal, toggleSucessModal] = useModal();
  const router = useRouter();

  const cvc = watch("cvc");
  const expiryMonth = watch("expiryMonth");
  const expiryYear = watch("expiryYear");
  const name = watch("name");
  const number = watch("number");
  const focus = watch("focus");

  const isDeposit = window.history.state.prevUrl ? window.history.state.prevUrl.endsWith("/cargarDinero/tarjeta") : false;
  console.log(isDeposit);
  
  const onSubmit = (data: PaymentInformationData) => {

    console.log(`${data.expiryMonth}/20${data.expiryYear}`);
    
    const cardData: CardData = {
      cod: parseInt(data.cvc),
      expiration_date: `${data.expiryMonth}/20${data.expiryYear}`,
      first_last_name: data.name,
      number_id: parseInt(data.number),
    };
    postCard(cardData);
  };

  const postCard = async (cardData: CardData) => {
    const token = localStorage.getItem("token");
    const account_id = localStorage.getItem("account_id");

    if (token) {
      await fetch(
        GET_CARDS(account_id as string),
        {
          method: "POST",
          body: JSON.stringify(cardData),
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        }
      )
        .then(async (res) => {
          const response = await res.json();
          if (response.error) {
            setError("Ha ocurrido un error, intentar nuevamente más tarde");
            return;
          } else {
            setError("");
            toggleSucessModal();
            return;
          }
        })
        .catch(function (err) {
          setError("Ha ocurrido un error, intentar nuevamente más tarde");
        });
    }
  };

  const handleAcceptSuccessModal = () => {
    toggleSucessModal();
    window.history.back()
  };

  const handleFocus = (e: any) => {
    setValue("focus", e.target.name);
  };

  useEffect(() => {
    setFocus("number");
  }, []);

  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.down("laptop"));
  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {mobile ? (
        <Box
          onClick={() => {window.history.back()}}
          sx={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            marginLeft: "12px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          <ArrowForwardIcon sx={{ marginRight: "5px" }} />
          <Typography sx={{ fontWeight: "bold" }}>Tarjetas</Typography>
        </Box>
      ) : (
        <Box
          onClick={() => {window.history.back()}}
          sx={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            marginLeft: "12px",
            marginTop: "15px",
            cursor: "pointer",
            "& svg": {
              fontSize: "33px"
            }
          }}
        >
          <ArrowCircleLeftOutlinedIcon sx={{ marginRight: "10px" }} />
          <Typography sx={{ fontWeight: "bold" }}>Volver</Typography>
        </Box>
      )}
      <Box
        sx={{
          width: mobile ? "90%" : "85%",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          marginTop: "30px",
          alignItems: "center",
          borderRadius: "5px",
          "& .css-1tsq5ia-MuiFormControl-root-MuiTextField-root": {
            backgroundColor: "white",
          },
        }}
        component="form"
      >
        <FormProvider {...methods}>
          <Box sx={{ marginBottom: "40px", marginTop: "40px !important" }}>
            <Cards
              cvc={cvc}
              expiry={`${expiryMonth}/${expiryYear}`}
              name={name}
              number={number}
              focused={focus}
              placeholders={{ name: "Nombre del titular" }}
            />
          </Box>
          {error && (
            <Typography
              component="div"
              textAlign={"center"}
              variant="h5"
              color={"error.main"}
              sx={{ margin: "1rem 0 ", fontWeight: "bold" }}
            >
              {error}
            </Typography>
          )}
          <Grid
            container
            rowSpacing={{ mobile: 3, tablet: 3 }}
            columnSpacing={{ mobile: 1, tablet: 5 }}
            sx={{ width: "90% !important", justifyContent: "flex-end" }}
          >
            <ControlledTextInput
              name="number"
              placeholder="Número de la tarjeta*"
              onFocus={handleFocus}
              type="number"
              width={laptopOrDesktop ? 6 : 12}
            />
            <ControlledTextInput
              name="name"
              placeholder="Nombre y apellido*"
              onFocus={handleFocus}
              type="text"
              width={laptopOrDesktop ? 6 : 12}
            />
            <Grid item mobile={12} tablet={6} sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
              <ControlledTextInput
                name="expiryMonth"
                placeholder={tablet ? "Mes*" : "Mes vencimiento*"}
                onFocus={handleFocus}
                type="number"
                width={5.9}
              />
              <ControlledTextInput
                name="expiryYear"
                placeholder={tablet ? "Año*" : "Año vencimiento*"}
                onFocus={handleFocus}
                type="number"
                width={5.9}
            />
            </Grid>
            <ControlledTextInput
              name="cvc"
              placeholder={tablet ? "CVV*" : "Código de seguridad*"}
              onFocus={handleFocus}
              type="number"
              width={mobile ? 12 : 6}
            />
            <Grid
              item
              mobile={laptopOrDesktop ? 6 : 12}
              display={"flex"}
              justifyContent={"center"}
            >
              <Button
                sx={{
                  borderRadious: "12px",
                  padding: "16.5px 14px",
                  fontWeight: "bold",
                }}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                fullWidth
                color="secondary"
                disabled={!formState.isValid}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
        <SuccessModal
          open={openSuccessModal}
          handleAccept={handleAcceptSuccessModal}
        />
      </Box>
    </Box>
  );
};

export default NuevaTarjetaForm;
