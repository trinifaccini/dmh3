import React, { useEffect, useState } from 'react';
import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import HeaderButtons from './buttons/header-buttons.component';
import Logo from 'integrador/components/svg/logo';
import { useRouter } from 'next/router';

type Props = {
    variant?: "index" | "signIn" | "home" | null,
}

const GeneralHeader: FC<Props> = ({variant}: Props) => {

    const router = useRouter();

    let logoColor = (variant == 'index' || variant == 'home') ? '#C1FD35' :'#201F22';

    const [logged, isLogged] = useState(false);

    useEffect(() => {
     
        const token = localStorage.getItem('token');
        if(token !== undefined && token !== null)
            isLogged(true);
    }, [])

    const push = () => {
        if(!logged)
            router.push('/')
    }

    return(
        <AppBar position="sticky" color={(variant == 'index' || variant == 'home') ? 'primary' : 'secondary'} sx={{boxShadow: 'none', zIndex: 10, padding: '0'}} >

            {/* <Container maxWidth={false}> */}
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignContent: 'center', margin: '0 0.75rem'}}>
                    <Box pt='10px' onClick={() => push()}>
                        <Logo color={logoColor}/>
                    </Box>
                    <HeaderButtons variant={variant}/>
                </Toolbar>
            {/* </Container> */}
        </AppBar>
    )
}

export default GeneralHeader;
