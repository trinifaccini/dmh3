import * as React from 'react';
import { Box, useMediaQuery } from '@mui/material'
import {Typography} from "@mui/material";
import { theme } from 'integrador/styles/material-theme';

const GeneralFooter = () => {

    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    return (
        <Box height='5vh' pl='1rem' sx={{ bgcolor: "primary.light", zIndex: 10, bottom: 0, position: 'fixed', width:'100%', display: 'flex', justifyContent: mobile ? 'center' : 'start', alignItems: 'center'}}>
            <Typography variant={'body2'} color={'secondary'}> © 2022 Digital Money House</Typography>
        </Box>
    );
};
export default GeneralFooter;