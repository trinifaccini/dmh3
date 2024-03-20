import * as React from 'react';
import PageHomeLayout from 'integrador/components/layouts/layout-home.component';
import { StepProvider } from 'integrador/components/contexts/StepContext';
import { Deposit } from 'integrador/components/deposit/deposit-page.component.page';
import { Box, Stack } from '@mui/system';
import { Typography, useMediaQuery } from '@mui/material';
import { theme } from 'integrador/styles/material-theme';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CardSelection } from '../deposit/card-selection.component';
import { PaymentMethod } from './PaymentMethods';
import { ServiceDetail } from './ServiceDetail';


export const ServicePayment = () => {

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    return (

            <Stack sx={{
                    width: '100%', 
                    alignItems: 'center', 
                    justifyContent: 'start'
                }} 
                mt={laptopOrDesktop ? '1rem': mobile ? '0' :'3rem'} 
                spacing={laptop ? 1.3 : 2.5 }
            >
                <ServiceDetail/>
            <PaymentMethod/>
            </Stack>
        
    )
}

(ServicePayment as any).Layout = PageHomeLayout;

export default ServicePayment;