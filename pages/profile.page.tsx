import * as React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, useMediaQuery, Button, Stack, Grid, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Input } from '@mui/material';
import Typography from '@mui/material/Typography';
import { theme } from 'integrador/styles/material-theme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHomeLayout from 'integrador/components/layouts/layout-home.component';
import Divider from '@mui/material/Divider';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopyToClipboard from 'integrador/services/useCopyToClipboard.services';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import ProfileInput from 'integrador/components/forms/input/profile-input.component';
import useProfile from 'integrador/components/contexts/useProfile';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import { GET_USER } from 'integrador/pages/api/api';
import { CircularProgress } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Profile: NextPage = () => {

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const [value, copy] = useCopyToClipboard();
    const [cvuCopied, setCvuCopied] = useState(false);
    const [aliasCopied, setAliasCopied] = useState(false);
        
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cancel, setCancel] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [change, setChange] = useState(false);

    const {state, dispatch} = useProfile();

    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [inputPassword, setInputPassord] = useState('');

    const router = useRouter();

    const setData = (data: any) => {        
        dispatch({type: 'alias', payload: localStorage.getItem("alias")})
        dispatch({type: 'email', payload: data.email});
        dispatch({type: 'firstname', payload: data.firstname});
        dispatch({type: 'lastname', payload: data.lastname});
        dispatch({type: 'phone', payload: data.phone});
        dispatch({type: 'cvu', payload: localStorage.getItem("cvu")});
        dispatch({type: 'password', payload: localStorage.getItem("password")});
        dispatch({type: 'dni', payload: data.dni});

        localStorage.setItem("email", data.email);
    }

    const copyFunction = (value: string | null | undefined) => {
        
        copy((!value ? "Error" : value));

        if(value == state.user.cvu) 
            setCvuCopied(true);

        else setAliasCopied(true);
    }

    const getData = async (tokenParam: string, userIdParam: string) => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : (!tokenParam ? '0' : tokenParam)
            }        
        }

        await fetch(GET_USER(userIdParam as string), requestOptions)
        .then(async (res) => {
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setData(data);
                setTimeout(() => { setLoading(false)}, 3000)
            }
            else {
                setError(data.message);
                setLoading(false);
                console.log(data.message)
            }
        })
        .catch((error) => {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
            setLoading(false)
    })

    }
    
    const cancelChanges = () => {
        setCancel(true);
        setChange(false);
    }

    const editData = () => {

        setOpen(false);

        const requestOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : (token ? token : '0')
            },
            body: JSON.stringify(state.user)
        }
    
    
        fetch(GET_USER(userId as string), requestOptions)
            .then(async (response) => {
                if (response.ok) {
                    setUpdated(true);
                    setChange(false);
                    state.user.password && localStorage.setItem("password", state.user.password);
                }
                else {
                    setError("Error 1")
                    setChange(false);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error.message)
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                setLoading(false);
                setChange(false);

            })
    }

    useEffect(() => {

        const tokenLS = localStorage.getItem("token");
        const userIdLS = localStorage.getItem("user_id");

        if(tokenLS == null || userIdLS == null){
            router.push("/login") 
        }
        else {
            setToken(tokenLS);
            setUserId(localStorage.getItem("user_id"));
            setUpdated(false);
            setLoading(true);
            getData(tokenLS, userIdLS);
        }    
        
    },[updated,/*state.user.email*/])

    return (
        <>
            <Head>
                <title>Perfil</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Stack sx={{
                    width: '100%', 
                    alignItems: 'center', 
                    justifyContent: 'start'
                }} 
                mt={laptopOrDesktop ? '1rem': mobile ? '0' :'3rem'} 
                spacing={laptop ? 1.3 : 2.5 }
                zIndex={3}
            >

                {mobile && 
                    <Box sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '90%', 
                        marginTop: '15px'}}>
                        <ChevronRightIcon fontSize='small'sx={{color: 'grey'}}/>
                        <Typography variant='body1'>Perfil</Typography>
                    </Box>
                }
                <Box 
                    sx={{
                        backgroundColor: 'white', 
                        width: '90%', 
                        borderRadius: '10px',
                        padding: "1.5rem 1.5rem 1rem",
                    }}>
                    <Typography variant='h4' width='60%' marginBottom='0.5rem'>Tus datos</Typography>
                    {
                        loading ? <CircularProgress sx={{marginTop: '1rem'}}/> : 
                        error.length > 0 ? <>Error al cargar tus datos </> : 
                        (<Stack spacing={{ mobile: 1.5, tablet: 0 }} divider={<Divider orientation="horizontal" flexItem sx={{marginTop: '0'}}/>}>
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'Email'} data={'email'}/>
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'Nombre'} data={'firstname'}/>
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'Apellido'} data={'lastname'}/>
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'Telefono'} data={'phone'} />
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'Contraseña'} data={'password'} hide={true}/>
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'ALIAS'} data= {'alias'} nonEditable={true}/>
                            <ProfileInput error={error} cancel={cancel} setChange={setChange} field={'DNI'} data={'dni'} nonEditable={true}/>
                            {/* <Divider orientation="horizontal" flexItem sx={{marginTop: '0', borderBottomWidth: 'inherit'}}/> */}
                        </Stack>)
                    }

                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                    {change &&
                        <Grid container columnSpacing={1} justifyContent='end' width={mobile ? '35%': laptopOrDesktop ? '23%' : '25%'} >
                            <Grid item mobile={6}>
                                <Button variant="contained" size="small" sx={{minWidth: '30px'}} onClick={() => cancelChanges()} fullWidth>
                                    {laptopOrDesktop ? 'Cancelar' : <ClearIcon/>}
                                </Button> 
                            </Grid>
                            <Grid item mobile={6}>
                                <Button variant="contained" color="secondary" size="small" onClick={() => setOpen(true)} sx={{minWidth: '30px'}} fullWidth>
                                    { laptopOrDesktop ? 'Guardar' : <CheckIcon/> }
                                </Button>
                            </Grid>
                        </Grid>}
                    {error && !change &&
                        <Tooltip title={'Error al actualizar'} disableFocusListener>
                            <IconButton>
                                <ErrorOutlineIcon color='error'/>
                            </IconButton>
                        </Tooltip>}
                    </Box>
                </Box>

                <Button sx={{
                    height: laptopOrDesktop ? '10%' : '7%', 
                    backgroundColor: '#C1FD35', 
                    width: '90%', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '0.5rem 1.5rem',
                    fontWeight: 'bold'
                    }}
                    onClick={()=> {router.push('/tarjetas')}}
                    endIcon={<ArrowForwardIcon />}>
                    <Typography variant={'h5'} >Gestióna los medios de pago</Typography>
                </Button>

                <Box sx={{
                    backgroundColor: 'primary.main', 
                    width: '90%', 
                    borderRadius: '10px',
                    padding: "1.5rem 1.5rem",
                }}>
                    <Typography color={mobile ? 'text.secondary' : '#FFFFFF'} variant={'h6'}>Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</Typography>
                    {loading ? <CircularProgress sx={{marginTop: '1rem', color: 'white'}}/> : error ? <>Error al cargar tus datos </> : 
                    
                    (<>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '0.75rem 0 0.75rem'}} >
                        <Box>
                            <Typography color='secondary.main' variant={'h5'}>CVU</Typography>
                            <Typography color='text.secondary' variant={'body1'}>{state.user.cvu}</Typography>
                        </Box>
                        <Tooltip title={cvuCopied ? "Copiado" : "Copiar CVU"} disableFocusListener onClick={() => copyFunction(state.user.cvu)} onMouseOut={event => setTimeout(() => { setCvuCopied(false)}, 5000)}>
                            <IconButton>
                                {cvuCopied ? <DoneIcon color='secondary'/> : <ContentCopyIcon color='secondary'/> }                            
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box>
                            <Typography color='secondary.main' variant={'h5'}>ALIAS</Typography>
                            <Typography color='text.secondary' variant={'body1'}>{state.user.alias}</Typography>
                        </Box>
                        <Tooltip title={aliasCopied ? "Copiado" : "Copiar ALIAS"} disableFocusListener onClick={() => copyFunction(state.user.alias)} onMouseOut={event=> setTimeout(() => { setAliasCopied(false)}, 5000)}>
                            <IconButton>
                                {aliasCopied ? <DoneIcon color='secondary'/> : <ContentCopyIcon color='secondary'/> }
                            </IconButton>
                        </Tooltip>
                    </Box>
                    </>)
                }                   
                </Box>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{padding: '1rem'}}
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant='h5'>
                            Ingresa tu contraseña para confirmar los cambios
                        </Typography>
                    </DialogTitle>
                    <DialogContent sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        <Input type={hiddenPassword ? 'password' : 'text'} onChange={(event) => setInputPassord(event.target.value)}/>
                        {hiddenPassword ? <VisibilityIcon onClick={() => setHiddenPassword(!hiddenPassword)}/> : <VisibilityOffIcon onClick={() => setHiddenPassword(!hiddenPassword)}/>}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" size='small' onClick={() => setOpen(false)} >Cancelar</Button>
                        <Button variant="contained" color="secondary"  size='small' onClick={() => editData()} autoFocus disabled={(inputPassword === state.user.password)? false : true}>Confirmar</Button>
                    </DialogActions>
                </Dialog>
                <Box height={'6vh'}>
                    
                </Box>
            </Stack>
        </>
        
    )
}

(Profile as any).Layout = PageHomeLayout;

export default Profile;
