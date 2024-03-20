import * as React from 'react';
import { FC, useState } from 'react';
import { IconButton, useMediaQuery } from '@mui/material';
import { theme } from 'integrador/styles/material-theme';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './menu-drawer.component';

const DigitalMenu:FC = ({}) => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    if (!mobile) {
        return (
            <MenuDrawer
                    variant={mobile ? "persistent" : "permanent"}
                    onClose={handleDrawerToggle}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle} 
                    mobile={!!mobile}
            />
        )
    }

    else {
        return (
            <>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        display: { sm: 'none' },
                        position: 'fixed',
                        top: '16px',
                        right: '75px',
                        zIndex: 2000,
                        color: '#C1FD35',
                        padding: 0,
                        margin: 0
                    }}
                > 
                    <MenuIcon sx={{margin: '0'}}/>
                </IconButton>
                <MenuDrawer
                    variant={mobile ? "persistent" : "permanent"}
                    onClose={handleDrawerToggle}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    mobile={!!mobile}
            />
            </>
        )
    }
        
        
    
}

export default DigitalMenu;


