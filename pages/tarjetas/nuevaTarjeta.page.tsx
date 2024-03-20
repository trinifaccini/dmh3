import { Box, CircularProgress, Typography } from "@mui/material";
import NuevaTarjetaForm from "integrador/components/forms/nuevaTarjeta/nueva-tarjeta-fom.component";
import PageHomeLayout from "integrador/components/layouts/layout-home.component";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { GET_CARDS } from "integrador/pages/api/api";
import Head from 'next/head'


export const NuevaTarjetaPage: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("account_id")
    if (!token) {
      router.push("/login");
    }else{
      fetch(GET_CARDS(accountId as string), {
                    headers: {
                        'Authorization': token 
                    }
                }).then(async (res) => {
                    const cards = await res.json();
                    setCards(cards)
                    setLoading(false)
                })
    }
  }, [])

  if (loading) {
    return  <Box sx={{height: "100vh", textAlign: "center"}}>
      <CircularProgress color="success" sx={{marginTop:"200px"}} />
    </Box>
  }

  if (!loading && cards.length === 10) {
    return (
      <>
        <Head>
            <title>Nueva tarjeta</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{height: "100vh", textAlign: "center"}}>
          <Box onClick={() => { router.push("/tarjetas") }}
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
            <Typography sx={{ fontWeight: "bold"}}>Volver</Typography>
          </Box>
          <Typography variant="h2" sx={{margin:"auto", marginTop:"200px", width: "80%"}}>
            No es posible agregar más tarjetas porque alcanzaste el límite de 10 tarjetas.
          </Typography>
        </Box>
      </>
    )
  }

  return <NuevaTarjetaForm />;
};

(NuevaTarjetaPage as any).Layout = PageHomeLayout;

export default NuevaTarjetaPage;
