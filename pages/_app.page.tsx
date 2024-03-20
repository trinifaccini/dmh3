import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import LayoutGeneral from "integrador/components/layouts/layout-general.component";
import {theme} from "integrador/styles/material-theme";
import '../styles/globals.css'
import useModal from 'integrador/components/hooks/useModal';
import SessionModal from 'integrador/components/modal/SessionModal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ProfileProvider } from 'integrador/components/contexts/ProfileContext';
import React from 'react';
import { POST_LOGIN } from 'integrador/pages/api/api';
import { ChargeMoneyProvider } from 'integrador/components/contexts/ChargeMoney';
import { PaymentServiceProvider } from 'integrador/components/contexts/PaymentServiceContext';


function MyApp({ Component, pageProps }: AppProps) {

  const LayoutComponent = (Component as any).Layout || LayoutGeneral;

  const [open, toggleSucessModal, openModal] = useModal();
  const router = useRouter();
  

  useEffect(() => {
    setInterval(openSessionModal, 8*60*1000);
    //Eliminamos el local storage al cerrar la tab
    //window.addEventListener("beforeunload", () => { window.localStorage.clear() });
  }, [])

  const handleAcceptSessionModal = async () => {
    toggleSucessModal();
    await login()
  }

  const handleClose = () => {
    router.push("/") 
    localStorage.clear();
    toggleSucessModal();
  }

  const login = async () => {
    const body = {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password")
    }
    const request = await fetch(POST_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      const response = await res.json()
      if(res.status== 200){
        localStorage.setItem("token", response.token)
      }else{
        router.push("/")
        localStorage.clear();
      }
    })
    .catch(function (err) {
      router.push("/")
      localStorage.clear();
    });
  }

  const openSessionModal = ()=>{
    const token = localStorage.getItem("token");
    if(token){
      openModal()
    }
  }

  const simpleContext = React.createContext(null);


  return <ThemeProvider theme={theme}>
      <ProfileProvider>
      <ChargeMoneyProvider>
      <PaymentServiceProvider>
      <CssBaseline />
      <LayoutComponent>
        <Component {...pageProps} />
        <SessionModal  open={open}
        handleAccept={handleAcceptSessionModal} handleClose={handleClose}/>
      </LayoutComponent>
      <style jsx global>{`
                /* Other global styles such as 'html, body' etc... */
                #__next {
                  height: 100%;
                }
              `}</style>
               </PaymentServiceProvider>
    </ChargeMoneyProvider>
    </ProfileProvider>
    </ThemeProvider>
}

export default MyApp
