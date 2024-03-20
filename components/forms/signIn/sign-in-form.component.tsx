import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from 'react';
import { UserDataFormSchema } from '../schemas/user-data-schema';
import ControlledTextInput from '../input/controlled-text-input.component';
import { useRouter } from 'next/router';
import { newUser, User } from 'types/user.types';
import { theme } from 'integrador/styles/material-theme';
import { POST_USER } from 'integrador/pages/api/api';
import CircularProgress from '@mui/material/CircularProgress';



const SignInForm = () => {

   //Evaluo si es mas chica que tablet, si es true significa que esta desde un movil
   const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

   //laptop and desktop
   const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));

  const router = useRouter();

  const methods = useForm<User>({
    resolver: yupResolver(UserDataFormSchema),
    defaultValues: {
      firstName: "",
      lastName:"",
      dni: "",
      email: "",
      password: "",
      repassword: "",
      phone: ""
    }
  });


  const {setFocus, handleSubmit} = methods;
  
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: User) => {
   
     const user : newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      dni: parseInt(data.dni),
      email: data.email,
      password: data.password,
      phone: data.phone
     };
    
    postUser(user)
   
  }
    
  
  
  const postUser = async (user : newUser) => {

    setLoading(true);
    
    await fetch(POST_USER, {
      method: 'POST', body: JSON.stringify(user), headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => { 
        const response = await res.json()
        if (response.error === "Email already registered"){
          setError("El email ya ha sido registrado");
          setLoading(false);
         return
        }
        if(res.status === 201){
          //setLoading(false); NO LE PONGO FALSE ACA ASI NO SE VUELVE A VER EL TEXTO ANTES DE HACER EL PUSH
          setError("")
          window.history.pushState({ prevUrl: window.location.href }, "", "/login")
          router.push("/login")
        }
    })
    .catch(function (err) {
      setError("Ocurrio un error al crear el usuario, intentar nuevamente más tarde");
      setLoading(false);
    })   
  } 

  useEffect(() => {
    setFocus("firstName")
  }, [setFocus])

  return (
    <Stack component="form" autoComplete="off" width={mobile ? '90%' : laptopOrDesktop ? '70%': '90%'} height={'100%'} padding={'10px 0 20px'} onSubmit={(e:React.FormEvent) => { e.preventDefault()}}> 
          <Typography component="div" textAlign={'center'} variant='h4' color={'text.secondary'} sx={{margin:'1rem 0 2rem', fontWeight: 'bold'}}>
            Crear cuenta
          </Typography>
          {error && <Typography component="div" textAlign={'center'} variant='h5' color={'error.main'} sx={{margin:'1rem 0 ', fontWeight: 'bold'}}>
          {error}
          </Typography>}
          <Grid container rowSpacing={{ mobile: 3, tablet: 3}} columnSpacing={{ mobile: 1, tablet: 5}}>
            <FormProvider {...methods}>
                <ControlledTextInput name="firstName" placeholder="Nombre*" type="text" width={mobile ? 12 : 6} registerPage={true}/>
                <ControlledTextInput name="lastName" placeholder="Apellido*" type="text" width={mobile ? 12 : 6} registerPage={true}/>
                <ControlledTextInput name="dni" placeholder="DNI*" type="number" width={mobile ? 12 : 6} registerPage={true}/>
                <ControlledTextInput name="email" placeholder="Email*" type="text" width={mobile ? 12 : 6} registerPage={true}/>
                <Grid item mobile={12}>
                  <Typography textAlign='center' variant='body2' color={'text.secondary'} width='100%'>
                    Usá entre 6 y 20 carácteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
                  </Typography>
                </Grid>
                <ControlledTextInput name="password" placeholder="Contraseña*" type="password" width={mobile ? 12 : 6} registerPage={true} />
                <ControlledTextInput name="repassword" placeholder="Confirmar contraseña*" type="password" width={mobile ? 12 : 6} registerPage={true}/>
                <ControlledTextInput name="phone" placeholder="Teléfono*" type="number" width={mobile ? 12 : 6} registerPage={true}/>
            </FormProvider>
            <Grid item mobile={12} tablet={6} display={'flex'} justifyContent={'center'}>
                <Button onClick={handleSubmit(onSubmit)} fullWidth color='secondary' variant='contained' sx={{borderRadious: '10px', padding: '16.5px 14px'}} disabled={loading}>
                {loading ? <CircularProgress size='14px'/> : "Crear cuenta"}
                </Button>            
            </Grid>
          </Grid>
    </Stack>
  );
}

export default SignInForm;


