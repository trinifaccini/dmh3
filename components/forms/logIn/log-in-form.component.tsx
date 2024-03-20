import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useStep from "integrador/components/contexts/useStep";
import LoginEmail from "./log-in-email-form.component";
import LoginPassword from "./log-in-password-form.component";
import { UserLogin } from "integrador/components/contexts/LoginContext";
import { useMediaQuery } from "@mui/material";
import { theme } from "integrador/styles/material-theme";

export type StepActions = {
  activeStep: number;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export type UserInfo = {
  userInfo: UserLogin;
  setUserInfo: (arg: UserLogin) => void;
};


const LogIn: React.FC = () => {
  
  const { state: stepState, dispatch: stepperDispatch } = useStep();

  React.useEffect(() => {
    stepperDispatch({
      type: "SET_STEP",
      payload: 0
    });
  }, [])

  
    //Evaluo si es mas chica que tablet, si es true significa que esta desde un movil
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));

    //laptop and desktop
    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));

    let laptop;

    if(laptopOrDesktop && !desktop)
        laptop = true;

  return (
      <Container sx={{width: mobile ? '95%' : laptopOrDesktop ? '35%' : '55%', paddingTop: mobile ? '55%' : laptopOrDesktop ? '' : '35%'}} >
        {stepState.step.step === 0 && <LoginEmail />}
        {stepState.step.step === 1 && <LoginPassword />}
      </Container>

  );
};

export default LogIn;
