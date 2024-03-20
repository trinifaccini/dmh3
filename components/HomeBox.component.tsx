import * as React from 'react';
import { useMediaQuery, Grid, Box, Container, Button, Typography, Stack } from '@mui/material/';
import { theme } from 'integrador/styles/material-theme';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import ActivitySummary, { Transaction } from './activitySummary/ActivitySummary';
import { GET_ACCOUNT, GET_ACTIVITY } from 'integrador/pages/api/api';
import { useRouter } from 'next/router';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

type HomeBoxProps = {
    token: string,
    accountId: string
}

const HomeBox = ({token, accountId}: HomeBoxProps) => {
    const [amount, setAmount] = useState(0);
    const [visibleMoney, setVisibleMoney] = useState(false);
    const [money, setMoney] = useState('');
    const [cents, setCents] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));

    const regExp = /[\W\w]/g;



    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const getLastTransactions = async () => {

        const request = await fetch(
            GET_ACTIVITY(accountId),
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            }
        ).then(async (res) => {
            const data = await res.json()
            if (res.ok) {
                setTransactions(data);
                setLoading(false)
            }
            else {
                setError("error");
                setLoading(false);
            }
        }).catch((error) => {
            console.warn(error.message)
            setAmount(0)
        });
    };

    const getData = async () => {

        const request = await fetch(GET_ACCOUNT, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            }
        }).then(async (res) => {
            const user = await res.json()
            if(res.ok) {
                setAmount(Math.trunc(user.available_amount));
                const m = new Intl.NumberFormat("es-AR").format(Math.trunc(user.available_amount));
                const c = Math.round(Math.abs(+user.available_amount.toFixed(2) - Math.trunc(user.available_amount))*100);
                const aux = c === 0 ? '00' : c.toString();
                setMoney(m);
                setCents(aux)
            }
            else{
                setError("Ocurrió un error. Vuelve a intentarlo")
            }
        }).catch((error) => {
            console.warn(error.message)
            setAmount(0)
        })
    }

    useEffect(() => {
        
        getData();
        getLastTransactions();
        
    }, [])

    const router = useRouter()

    return (
        <Stack spacing={2} width={"100%"} alignItems={'center'}>
            <Box sx={{
                marginTop: '20px',
                height: mobile ? '180px' : '230px',
                borderRadius: '10px',
                backgroundColor: 'black',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'space-between',
                padding: laptopOrDesktop ? '28px 32px' : '16px',
                width: '90%'
            }}>

                <Box display={'flex'} gap={'16px'} justifyContent={'flex-end'} sx={{width: '100%'}}>
                    <Link href={`/tarjetas`} style={{cursor: 'pointer'}}>
                        <Typography variant='body1' color='text.secondary' fontWeight='bold' sx={{textDecoration: 'underline', cursor: 'pointer'}}> Ver tarjetas </Typography>
                    </Link>
                    <Typography variant='body1' color='text.secondary' fontWeight='bold' sx={{textDecoration: 'underline'}}> Ver CVU </Typography>
                </Box>
                <Box >
                    <Box display={'flex'} justifyContent='space-between' alignItems={'center'}>
                        <Typography variant='h5' color='text.secondary' paddingLeft={mobile ? '0px' : '15px'} marginRight='20px'> Dinero disponible </Typography>
                        { visibleMoney ? <VisibilityIcon sx={{color: 'white', cursor: 'pointer'}} onClick={() => setVisibleMoney(false)}/> : <VisibilityOffIcon sx={{color: 'white', cursor: 'pointer'}} onClick={() => setVisibleMoney(true)}/>}
                    </Box>
                    <Typography sx={{ border: '2px solid #C1FD35', padding: '10px', borderRadius: '45px', width: 'fit-content', paddingX: '15px' }}
                        marginTop='14px' variant={mobile ? 'h3' : 'h1'} color='text.secondary' fontWeight='bold'> 
                        { visibleMoney ? `${money},${cents}` : `${money.replaceAll(regExp, "*")},${cents.replaceAll(regExp, "*")}` }
                    </Typography>
                </Box>
            </Box>

            <Grid container columnSpacing={{laptop: 2}} rowSpacing={{mobile: 2, laptop: 0}} width='90% !important'>
                <Grid item mobile={12} laptop={6} paddingLeft='0px !important' paddingTop='0 !important'>
                    <Button variant="contained" color="secondary"  size='large' fullWidth onClick={() => router.push('/cargarDinero')}
                        sx={{
                            height: mobile ? '67px' : laptopOrDesktop ? '100px' : '85px',
                            textTransform: 'unset', fontWeight: 'bold', position: 'inherit',
                        }}>
                        Cargar Dinero
                    </Button>
                </Grid>

                <Grid item mobile={12} laptop={6} paddingRight='0px !important' >
                    <Button variant="contained" color="secondary"  size='large' fullWidth
                    onClick={() => router.push('/pagarServicios')}
                        sx={{
                            height: mobile ? '67px' : laptopOrDesktop ? '100px' : '85px',
                            textTransform: 'unset', fontWeight: 'bold', position: 'inherit',
                        }}>
                        Pago de servicios
                    </Button>
                </Grid>
            </Grid>
            
            {!loading && <ActivitySummary transactions={transactions && transactions?.length > 3 ? transactions?.slice(transactions.length-4, transactions.length) : transactions} home/>}
        </Stack>
    );
}

export default HomeBox;
