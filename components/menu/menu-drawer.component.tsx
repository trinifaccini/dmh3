import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from "next/router";
import { FC } from 'react';
import { Box } from '@mui/material';

interface MenuDrawerProps {
  mobileOpen: boolean, 
  onClose: any, 
  handleDrawerToggle: any, 
  variant: "persistent" | "permanent" | "temporary" | undefined,
  mobile: boolean
}

const MenuDrawer: FC<MenuDrawerProps> = ({mobileOpen, onClose, handleDrawerToggle, variant, mobile}: MenuDrawerProps) => {

  const drawerWidth = 240;
  const router = useRouter();

  const handleClick = (text:string) => {

    if(text === 'Cerrar Sesión'){
      localStorage.clear();
      router.push("/");
    }

    if(text === 'Tu perfil')
      router.push("/profile")

    if(text === 'Inicio')
      router.push("/home")

    if(text === 'Tarjetas')
      router.push("/tarjetas")

      if(text === 'Cargar dinero')
      router.push("/cargarDinero")

      if(text === 'Actividad')
      router.push("/actividad")

      if(text === 'Pagar servicios')
      router.push("/pagarServicios")
  }

  const checkIfItsSelected = (page:string) => {
   const path = router.asPath   
    if(page === 'Tu perfil' && path === "/profile" ){
      return "bold"
    }
    if(page === 'Inicio' && path === "/home" ){
      return "bold"
    }
    if(page === 'Tarjetas' && (path === "/tarjetas" || path === "/tarjetas/nuevaTarjeta" )){
      return "bold"
    }
    if(page === 'Actividad' && ( path === "/actividad" )){
      return "bold"
    }
    if(page === 'Cargar dinero' && (path.startsWith("/cargarDinero"))){
      return "bold"
    }

    if(page === 'Pagar servicios' && (path.startsWith("/pagarServicios"))){
      return "bold"
    }
  }
 
  return (
    <Drawer
        variant={variant}
        open={mobileOpen}
        sx={{
        backgroundColor: 'red',
        width: mobile ? 0 : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: '30px', paddingTop: '35px', backgroundColor: '#C1FD35', zIndex: 5}}}
        >
        <Box sx={{ overflow: 'auto'}}>
            <List>
            {['Inicio', 'Actividad', 'Tu perfil', 'Cargar dinero', 'Pagar servicios', 'Tarjetas', 'Cerrar Sesión'].map(text => (
                <ListItem key={text} disablePadding onClick={() => handleClick(text)}>
                <ListItemButton sx={{paddingX: 5, paddingY :0}}>
                    <ListItemText primary={text} className={checkIfItsSelected(text)}/>
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
      </Drawer>
  );
}

export default MenuDrawer;
