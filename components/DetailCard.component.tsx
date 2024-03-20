import * as React from 'react';
import { Box, useMediaQuery, Button, Stack, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import { theme } from 'integrador/styles/material-theme';
import { FC } from 'react';
import type { Transaction } from 'integrador/components/activitySummary/ActivitySummary';

interface DetailProps {
    transaction: Transaction
}

const DetailCard: FC<DetailProps> = ({ transaction }) => {

    
    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    const router = useRouter();

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    function formatDate(dateString: any) {
        if (dateString) {
            const date = new Date();
            date.setMonth(parseInt(dateString.substring(5, 7)) - 1);
            return dateString.substring(8, 10) + " de " + date.toLocaleString('es-AR', { month: 'long' }) + " " +
                dateString.substring(0, 4) + " a las " + dateString.substring(11, 16)
        }
    }


    return (
        <>
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '90%',
                borderRadius: '10px',
                padding: '1rem 1rem',
                marginTop: '1rem',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    m: '1rem 2rem',
                    marginLeft: '2rem'
                }}
                
                >
                    <Box width={'100%'} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'start' : 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton sx={{ paddingLeft: '0px' }}>
                                    <CheckCircleOutlineIcon color='secondary' />
                                </IconButton>
                                <Typography color='secondary' variant={'subtitle2'}>Aprobada</Typography>
                            </Box>

                            <Box>
                                <Typography color='gray' variant={'subtitle2'}>{`Creada el ${formatDate(transaction?.dated)} hs.`}</Typography>
                            </Box>
                        </Box>

                        <hr style={{ width: '100%', border: '1px #626262 solid' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <Typography color='secondary.light' variant={'h6'}>{transaction?.description ? transaction?.description : 'Extrajiste dinero'}</Typography>
                                <Typography color='secondary' variant={'h5'}>{`$ ${transaction?.amount}`}</Typography>
                            </div>
                            <div>
                                <Typography color='secondary.light' sx={{ fontSize: '16px' }}>{`${transaction?.type === 'Deposit' ? 'Depósito:' : (transaction?.type === 'Transfer'?'Le transferiste a:': "")}`}</Typography>
                                <Typography color='secondary' variant={'h4'}>{`${transaction?.destination ? transaction?.destination :(!transaction?.description?.startsWith("Pagaste") ? 'Cuenta Propia DMH':"")}`}</Typography>
                            </div>
                            <div>
                                <Typography color='secondary.light' sx={{ fontSize: '16px' }}>Número de operación</Typography>
                                <Typography color='secondary' variant={'body1'}>27903047281</Typography>
                            </div>
                        </Box>
                    </Box>
                </Box>

            </Box>

            <Grid container sx={{ width: '90% !important', display: 'flex', justifyContent: 'end'}} columnSpacing={{mobile: 2}} >
                <Grid item mobile={6} laptop={3} sx={{paddingLeft:'0px !important'}}>
                    <Button variant="contained" size='large' fullWidth
                        sx={{
                            height: '64px', backgroundColor: "#CECECE", color: "#000000",
                            textTransform: 'unset', fontWeight: 'bold',
                        }} onClick={()=> {router.push('/home')}}>
                        <h4>Ir al inicio</h4>
                    </Button>
                </Grid>

                <Grid item mobile={6} laptop={3}>
                    <Button variant="contained" color="secondary" size='large' fullWidth
                        sx={{
                            height: '64px', textTransform: 'unset', fontWeight: 'bold',
                        }} >
                        <h4>Descargar comprobante</h4>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default DetailCard;
