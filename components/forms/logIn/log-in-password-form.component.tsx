import useStep from "integrador/components/contexts/useStep";
import { useForm, FormProvider } from "react-hook-form";
import * as React from "react";
import useLogin from "integrador/components/contexts/useLogin";
import ControlledTextInput from "../input/controlled-text-input.component";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import StepperNavigation from "./StepperNavigation";
import { Grid, Typography } from "@mui/material";
import { GET_ACCOUNT, POST_LOGIN } from "integrador/pages/api/api";


export type UserPasswordData = {
    password: string
  };

const LoginPassword = ( ) => {
  const { state: stepState, dispatch: stepperDispatch } = useStep();
  const { state, dispatch } = useLogin();
  const router = useRouter()
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);


  const methods = useForm<UserPasswordData>({
    defaultValues: {
      password: "",
    },
  });

  const { setFocus, handleSubmit } = methods;
  const onSubmit = async (data: UserPasswordData) => {

    setLoading(true);

    dispatch({
      type: "SET_PASSWORD",
      payload: data,
    });
    const formPost = {
      ...state.user, ...data
    }


    const request = await fetch(POST_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPost),
    }).then(async (res) => {
      const response = await res.json()
      if(res.status== 200){
        getAccount(response.token)
        localStorage.setItem("token", response.token)
        localStorage.setItem("email", state.user["email"] )
        localStorage.setItem("password", data["password"] )
        setTimeout(() => { router.push("/home")}, 2000)
      }else{
        setLoading(false);
        setError("Contraseña incorrecta. Vuelve a intentarlo")
      }
    })
    .catch(function (err) {
      setLoading(false);
      setError("Ocurrio un error al intentar loguearse, intentar nuevamente más tarde");
    });
  };

  React.useEffect(() => {
    setFocus("password");
  }, []);

  const getAccount = async (token: string) => {
    const request = await fetch(GET_ACCOUNT, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    }).then(async (res) => {
      const response = await res.json()
        if(res.status == 200){
          //setLoading(false); NO LE PONGO FALSE ACA ASI NO SE VUELVE A VER EL TEXTO ANTES DE HACER EL PUSH
          localStorage.setItem("account_id", response.id)
          localStorage.setItem("user_id", response.user_id )
          localStorage.setItem("cvu", response.cvu)
          localStorage.setItem("alias", response.alias);
      }else{
        setError("Ocurrió un error. Vuelve a intentarlo")
      }
    })
    .catch(function (err) {
      setError("Ocurrio un error al intentar loguearse, intentar nuevamente más tarde");
    });
  };
  


    return(
      <Stack component="form" autoComplete="off"  width='100%' onSubmit={(e:React.FormEvent) => { e.preventDefault()}}>
        <FormProvider {...methods}>
          <Grid container rowSpacing={2}>
            <Grid item mobile={12}>
                <Typography variant='h4' textAlign='center' color='white'> Ingresá tu contraseña </Typography>
            </Grid>
            <ControlledTextInput name="password" placeholder="Contraseña" type="password" width={12}/>
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
    )
}

export default LoginPassword