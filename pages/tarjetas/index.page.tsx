import * as React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, useMediaQuery, Button, Stack, Grid, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { theme } from 'integrador/styles/material-theme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageHomeLayout from 'integrador/components/layouts/layout-home.component';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { useRouter } from "next/router";
import { Card } from 'types/card.type';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DELETE_CARD, GET_CARDS } from 'integrador/pages/api/api';


export const Cards: NextPage = () => {

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }
      }, [])

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [open, setOpen] = useState(false);
    const [deletedError, setDeletedError] = useState(false);

    const [cards, setCards] = useState<Card[]>([])

    const router = useRouter();


    const handleClose = () => {
    setOpen(false);
    };
   


    const getCards = async (token: string | null, account_id: string | null) => {

        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : (!token ? '0' : token)
            }        
        }

        await fetch(GET_CARDS(account_id as string), requestOptions)
        .then(async (res) => {
            const data = await res.json()
            if (res.ok) {
                setCards(data);
                setLoading(false);
            }
            else {
                setError(true);
                setLoading(false);
            }
        })
        .catch((error) => {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
            setLoading(false);
            setError(true);
    })

    }

    const deleteAction = (cardId: number) => {

        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("account_id");

        deleteCard(token, accountId, cardId)
    }

    const deleteCard = async (token: string | null, accountId: string | null, cardId: number | null) => {

        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : (token ? token : '0')
            }        
        }
    
        await fetch(DELETE_CARD(accountId as string, cardId as number), requestOptions)
            .then(async (response) => {
                if (response.ok) {
                    setDeleted(true); // SI SE ELIMINA, SE RECARGA LA PARTE DE TARJETAS
                }
                else {
                    setOpen(false);
                    setDeletedError(true)
                    setLoading(false);
                }
            })
            .catch((error) => {
                setDeletedError(true)
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                setLoading(false);
                setOpen(false);

            })
    }

    const tarjetaVencida = (expDate: string) => {

        const array = expDate.split("/");

        const currentYear = new Date().getFullYear().toString();
        const currentMonthWrong = new Date().getMonth();
        const currentMonth = (currentMonthWrong + 1).toString();

        console.log(currentMonth)

        if(array[1] < currentYear) return true
        if(array[1] == currentYear && array[0] <= currentMonth)
            return true;
    }


    useEffect(() => {
        setDeletedError(false)
        setOpen(false);
        setDeleted(false);
        setLoading(true);
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("account_id");
        getCards(token, accountId);
    },[deleted])


    return (
        <>
            <Head>
                <title>Tarjetas</title>
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
            >

                { mobile && 
                    <Box sx={{display: 'flex', alignItems: 'center', width: '90%', marginTop: '15px'}}>
                        <ChevronRightIcon fontSize='small'sx={{color: 'grey'}}/>
                        <Typography variant='body1'>Tarjetas</Typography>
                    </Box>
                }

                <Box sx={{
                    backgroundColor: 'primary.main', 
                    width: '90%', 
                    borderRadius: '10px',
                    padding:'1rem 1rem'
                }}>
                    <Typography color={'#FFFFFF'} variant={'h6'}>Agregá tu tarjeta de débito o crédito</Typography>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        m: '0.75rem 0 0.75rem',
                        cursor: 'pointer'
                        }} 
                        onClick={() => router.push('tarjetas/nuevaTarjeta') } 
                    >
                        <Box width={'100%'} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <IconButton>
                                    <AddCircleOutlineIcon color='secondary'/>
                                </IconButton>
                                <Typography color='secondary' variant={'body1'}>Nueva tarjeta</Typography>
                            </Box>
                            <IconButton>
                                <ArrowForwardIcon color='secondary'/>
                            </IconButton>
                        </Box>

                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: 'white', 
                    width: '90%', 
                    borderRadius: '10px',
                    padding: "1.5rem 1.5rem",
                }}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant={'h4'}>Tus tarjetas</Typography>
                        {deletedError &&
                            <Tooltip title={'Error al eliminar la tarjeta'} disableFocusListener>
                                <IconButton>
                                    <ErrorOutlineIcon color='error'/>
                                </IconButton>
                            </Tooltip>
                        }
                    </Box>
                    <Stack divider={<Divider orientation="horizontal" flexItem sx={{marginTop: '0', borderBottomWidth: 'inherit'}}/>}>
                        {loading ? (<> Cargando tarjetas.. </>) : error ? (<>Error al cargar tus tarjetas </>) : 
                            cards.length == 0 ? <>No tenés tarjetas asociadas</> :
                            cards.map((c) => (
                                <>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '4rem'}}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CircleIcon color="secondary" sx={{marginRight: '10px', fontSize: '2rem'}}/>
                                        <Box>
                                            <Typography fontWeight='regular' variant={'h6'}>Terminada en {c.number_id.toString().slice(-4)}</Typography>
                                            <Typography variant='body2' sx={{opacity: '50%'}}>{tarjetaVencida(c.expiration_date) ? 'Tarjeta vencida' : '' }</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant={'h6'} onClick={() => {setOpen(true)}} sx={{cursor: 'pointer'}}>Eliminar</Typography>  
                                </Box> 
                                <Divider orientation="horizontal" sx={{marginTop: '0'}}/>         
                                <Dialog
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        <Typography variant='h5'>
                                            ¿Seguro que quieres eliminar la tarjeta terminada en {c.number_id.toString().slice(-4)}?
                                        </Typography>
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                        <Typography variant='body1' color={'black'}>
                                        Esta accion es definitiva
                                        </Typography>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="contained" size='small' onClick={() => setOpen(false)}>Cancelar</Button>
                                        <Button variant="contained" color="secondary"  size='small' onClick={() => deleteAction(c.id)} autoFocus>Eliminar</Button>
                                    </DialogActions>
                                </Dialog>
                                </>
                                ))
                            }
                            
                    </Stack>
                </Box>
                <Box height={'6vh'}>
                </Box>
           
            </Stack>
        </>
        
    )
}

(Cards as any).Layout = PageHomeLayout;

export default Cards;
