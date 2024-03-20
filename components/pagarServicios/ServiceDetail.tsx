import * as React from 'react';
import { Box, useMediaQuery, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { theme } from 'integrador/styles/material-theme';
import Divider from '@mui/material/Divider';
import usePaymentService from '../contexts/usePaymentContext';


export const ServiceDetail = () => {

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    const { state: paymentServiceState, dispatch: paymentServiceDispatch } =
    usePaymentService();

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;
    

    return (
            <>
                <Stack sx={{
                    backgroundColor: 'primary.main', 
                    width: '90%', 
                    borderRadius: '10px',
                    padding:'1.5rem 1.5rem',
                    alignItems: "center"
                }}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:"25px", width:"100%"}}>
                    <Typography variant={'h4'} color='secondary' sx={{fontSize: "28px"}}>{paymentServiceState.method.service}</Typography>
                    <Typography variant={'h6'} sx={{textDecoration:"underline", color:"white", fontSize: mobile ?"12px !important" : "17px"}}>Ver detalles del pago</Typography>
                    </Box>
                    <Divider sx={{borderColor: "rgba(128, 128, 128, 0.8)", width:"100%", marginBottom:"20px"}}/>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:"99%"}}  >
                                <Typography variant={'h4'} sx={{color:"white"}}>Total a pagar:</Typography>
                                <Typography variant={'h4'}  sx={{color:"white"}}>{"$"+paymentServiceState.method.amount}</Typography>

                            </Box>
                </Stack>

           
            </>
    )
}
