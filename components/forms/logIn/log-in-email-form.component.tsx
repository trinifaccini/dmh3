import useStep from "integrador/components/contexts/useStep";
import { useForm, FormProvider } from "react-hook-form";
import * as React from "react";
import useLogin from "integrador/components/contexts/useLogin";
import ControlledTextInput from "../input/controlled-text-input.component";
import StepperNavigation from "./StepperNavigation";
import Stack from "@mui/material/Stack";
import { Button, Grid, Typography } from "@mui/material";
import { POST_LOGIN } from "integrador/pages/api/api";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';


export type UserEmailData = {
  email: string;
};

const LoginEmail: React.FC = () => {
  const { state: stepState, dispatch: stepperDispatch } = useStep();
  const { state, dispatch } = useLogin();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);


  const methods = useForm<UserEmailData>({
    defaultValues: {
      email: "",
    },
  });

  const fakePass = {
    password: "hola",
  };

  const { setFocus, handleSubmit } = methods;

  const onSubmit = async (data: UserEmailData) => {

    dispatch({
      type: "SET_EMAIL",
      payload: data,
    });
    dispatch({
      type: "SET_PASSWORD",
      payload: fakePass,
    });

    const formPost = {
      ...data,
      ...fakePass,
    };

    setLoading(true);

    const request = await fetch(POST_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPost),
    })
      .then((res) => {
        if (res.status == 401) {
          //setLoading(false); NO LE PONGO FALSE ACA ASI NO SE VUELVE A VER EL TEXTO ANTES DE HACER EL PUSH
          stepperDispatch({
            type: "SET_STEP",
            payload: ++stepState.step.step,
          });
        } else{
          setLoading(false);
          setError("Usuario inexistente. Vuelve a intentarlo")
        }
      })
      .catch(function (err) {
        setLoading(false);
        setError("Ocurrio un error al intentar loguearse, intentar nuevamente más tarde");
      });
  };

  React.useEffect(() => {
    setFocus("email");
  }, []);

  return (

    <Stack component="form" autoComplete="off" width='100%' onSubmit={(e:React.FormEvent) => { e.preventDefault()}}> 
      <FormProvider {...methods}>
        <Grid container rowSpacing={2}>
          <Grid item mobile={12}>
            <Typography variant='h4' textAlign='center' color='white'> ¡Hola! Ingresá tu e-mail </Typography>
          </Grid>
            <ControlledTextInput name="email" placeholder="Email" type="text" width={12}/>
            <Grid item mobile={12}>
              <StepperNavigation handleSubmit={handleSubmit(onSubmit)} loading={loading}/>
              {error && !loading && 
              <Typography component="div" textAlign={'center'} variant='h6' color={'error.main'} sx={{margin:'1rem 0 ', fontWeight: 'bold'}}>
                {error}
              </Typography>}
            </Grid>
        </Grid>
      </FormProvider>
    </Stack>
  );
};

export default LoginEmail;
