import * as React from "react";
import Button from "@mui/material/Button";
import useStep from "integrador/components/contexts/useStep";
import { useRouter } from "next/router";
import { CircularProgress, Grid } from "@mui/material";


export type StepperProps = {
  handleSubmit: () => void,
  loading: boolean
};

const StepperNavigation: React.FC<StepperProps> = ({ handleSubmit, loading }) => {
  
  // const stepActions = React.useContext(StepContext) as StepActions;
  const { state: stepState, dispatch: stepperDispatch } = useStep();
  const router = useRouter()
  
  const handlePrev = () => {
    router.push("/signIn")
  }

  const isFormRegister = window.history.state.prevUrl ? window.history.state.prevUrl.endsWith("/signIn") : false;

  return (
    <Grid container rowSpacing={2}>
      <Grid item mobile={12}>
        <Button onClick={handleSubmit} fullWidth color='secondary' variant='contained' sx={{borderRadious: '10px', height: '100%', padding: '16.5px 14px'}} disabled={loading}>
          {loading ? <CircularProgress size='1.5rem'/> : "Continuar"}
        </Button>
      </Grid>

        {stepState.step.step < 1 && ! isFormRegister && (
          <Grid item mobile={12}>
            <Button onClick={handlePrev} fullWidth  variant='contained' sx={{borderRadious: '10px', height: '100%', padding: '16.5px 14px', backgroundColor: "#CECECE", color: "#000000"}}>
              Crear cuenta
            </Button>
          </Grid>

      )}
    </Grid>
 
  );
};

export default StepperNavigation;
