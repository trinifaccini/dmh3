import * as React from 'react';
import { CardSelection } from 'integrador/components/deposit/card-selection.component';
import useStep from 'integrador/components/contexts/useStep';
import { useEffect } from 'react';
import { AmountSelection } from 'integrador/components/deposit/amount-selection.component';
import { DepositConfirmation } from 'integrador/components/deposit/deposit-confirmation.component';
import ChargeMoneyCVU from './CVU-selection.component';
import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import { Container, Stack, width } from '@mui/system';
import { theme } from 'integrador/styles/material-theme';

type DepositProps = {
  page: "card" | "transferences",
  steps: string[]
}

export const Deposit:React.FC<DepositProps> = ({page, steps} : DepositProps) => {

    const { state: stepState, dispatch: stepperDispatch } = useStep();

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));


    useEffect(() => {
        stepperDispatch({
          type: "SET_STEP",
          payload: 0
        });
      }, [])

    const goPreviousStep = (actualStep:number) => {

      if(actualStep < stepState.step.step)
        stepperDispatch({type: "SET_STEP", payload: actualStep})
    }

    return (
      <Stack width={'100%'} justifyContent='center' alignContent='center' alignItems={'center'} flexWrap={'wrap'} spacing={3}>

        <Stepper activeStep={stepState.step.step} sx={{width: laptopOrDesktop ? '70%' : '90%', marginTop: '1rem'}}>

          {steps.map((label, index) => {
            return (
              <Step key={label} sx={{cursor:'pointer', [`& .MuiStepLabel-label`]: {color: 'black'}}} onClick={() => goPreviousStep(index)}>
                <StepLabel >{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      
          <Container sx={{width: '90%', padding: 0}} >
            {stepState.step.step === 0 && (page == "card" ? <CardSelection/> : <ChargeMoneyCVU />)} 
            {stepState.step.step === 1 && <AmountSelection/>}
            {stepState.step.step === 2 && <DepositConfirmation page={page}/>}
          </Container>
          
        </Stack>
    )
}