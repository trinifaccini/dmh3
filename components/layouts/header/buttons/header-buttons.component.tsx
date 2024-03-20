import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import { theme } from 'integrador/styles/material-theme';
import { GET_USER } from 'integrador/pages/api/api';

type Props = {
    variant?: "index" | "signIn" | "home" | null
}

const HeaderButtons: FC<Props> = ({ variant }: Props) => {
        
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    const getUser = async (token: string, userId: string) => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : (!token ? '0' : token)
            }        
        }

        await fetch(GET_USER(userId as string), requestOptions)
        .then(async (res) => {
            const user = await res.json();
            if (res.ok) {
                console.log(user)
                setFirstName(user.firstname);
                setLastName(user.lastname);
            }
            else {
                setError(user.message);
                console.log(user.message)
            }
        })
        .catch((error) => {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        })

    }

    useEffect(() => {

        if(variant == "home") {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            if(token != null && userId != null)
                getUser(token, userId)
        }
    }, [])


    const router = useRouter();

    if (variant == 'home') {
        return (
            <Box display='flex' alignItems='center' onClick={() => router.push('/home')}>
                <Button variant="contained" color="secondary" size='small' sx={{minWidth: mobile ? '40px' : '64px', padding: mobile ? '0' : '4px 10px'}} >
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {firstName && firstName.charAt(0).toUpperCase()}{lastName && lastName.charAt(0).toUpperCase()}
                    </Typography>
                </Button>
                {!mobile &&
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold', paddingX: 2 }}>
                        {firstName && `Hola, ${firstName}`}
                    </Typography>
                }
            </Box>
        )
    }

    else if (variant == 'index')
        return (

            <Box>
                <Grid container columnSpacing={{ mobile: 1, tablet: 2 }}>
                    <Grid item mobile={5}>
                        <Button variant="outlined" color="secondary" onClick={() => router.push('/login')} fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item mobile={7}>
                        <Button variant="contained" color="secondary" onClick={() => router.push('/signIn')} fullWidth>
                            Crear cuenta
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )

    else if (variant == 'signIn')
        return (
            <Box >
                <Button variant="contained" onClick={() => router.push('/login')}>
                    Iniciar sesion
                </Button>
            </Box>
        )

    else return <></>
}

export default HeaderButtons;