import * as React from 'react';
import { Box, useMediaQuery, Button, Stack, Radio, List, ListItem, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { theme } from 'integrador/styles/material-theme';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { useRouter } from "next/router";
import { Card } from 'types/card.type';
import { GET_CARDS } from 'integrador/pages/api/api';
import useChargeMoney from 'integrador/components/contexts/useChargeMoney';
import useStep from '../contexts/useStep';



export const CardSelection = () => {

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string>('');
    const [cards, setCards] = useState<Card[]>([]);

    const { dispatch: chargeMoneyDispatch} = useChargeMoney();
    const { dispatch: stepperDispatch } = useStep();

    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCardId(event.target.value);
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
        }).catch((error) => {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
            setLoading(false);
            setError(true);
    })

    }

    const tarjetaVencida = (expDate: string) => {

        const array = expDate.split("/");

        const currentYear = new Date().getFullYear().toString();
        const currentMonthWrong = new Date().getMonth();
        const currentMonth = (currentMonthWrong + 1).toString();

        if(array[1] < currentYear) return true
        if(array[1] == currentYear && array[0] <= currentMonth)
            return true;
    }

    const selectCard = () => {
        chargeMoneyDispatch({type: "SET_ACCOUNT", payload: selectedCardId});
        stepperDispatch({type: "SET_STEP", payload: 1 });
    }

    const goToNuevaTarjeta = () => {
        router.push('/tarjetas/nuevaTarjeta')    
    }

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
        }

        const accountId = localStorage.getItem("account_id");
        getCards(token, accountId);
    },[])

    return (
            <>
                <Box sx={{
                    backgroundColor: 'primary.main', 
                    width: '100%', 
                    borderRadius: '10px',
                    padding:'1.5rem 1.5rem',
                    marginBottom: '2rem'
                }}>
                    <Typography variant={'h4'} color='secondary'>Seleccionar tarjeta</Typography>
                    <Box sx={{
                        backgroundColor: 'white', 
                        width: '100%', 
                        borderRadius: '10px',
                        padding:'1rem 1rem',
                        marginTop: '1rem'
                    }}>
                        <Typography variant={'h6'}>Tus tarjetas</Typography>
                        {
                            loading ? <CircularProgress sx={{marginTop: '1rem'}}/>: error ? (<>Error al cargar tus tarjetas </>) : 
                            cards.length == 0 ? <>No tenés tarjetas asociadas</> :
                            <List sx={{ 
                                width: '100%',
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 200,
                                '& ul': { padding: 0 },
                                }}>
                            {
                            cards.map((c) => (
                                tarjetaVencida(c.expiration_date) ?
                                <></> : 
                                <>
                                    <ListItem key={`item-${c.id}`} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '4rem'}}>
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <CircleIcon color="secondary" sx={{marginRight: '1rem'}}/>
                                            <Typography fontWeight='regular' variant={'h6'}>Terminada en {c.number_id.toString().slice(-4)}</Typography>
                                        </Box>
                                        <Radio
                                            checked={selectedCardId === c.number_id.toString()}
                                            onChange={handleChange}
                                            value={c.number_id}                                              
                                            name="radio-buttons"
                                            id="radio-test"
                                        />
                                    </ListItem> 
                                    <Divider component="li" />
                                </>
                            ))}
                            </List>
                        }
                    </Box>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        m: '0.75rem 0 0.75rem'
                        }} 
                    >
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} onClick={goToNuevaTarjeta} >
                                <IconButton>
                                    <AddCircleOutlineIcon color='secondary'/>
                                </IconButton>
                                <Typography color='secondary' variant={'body1'} sx={{cursor: 'pointer'}}>Nueva tarjeta</Typography>
                            </Box>
                            {!mobile && 
                            <Button color="secondary" variant="contained" disabled={!selectedCardId} size='large' onClick={() => selectCard()}>
                                Continuar
                            </Button>}
                        </Box>
                </Box>
                
                {mobile && 
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'center'}}>
                    <Button color="secondary" variant="contained" disabled={!selectedCardId} size='large' onClick={() => selectCard()}>
                        Continuar
                    </Button>
                </Box>}
           
            </>
    )
}


