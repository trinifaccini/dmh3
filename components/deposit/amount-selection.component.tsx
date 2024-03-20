import * as React from 'react';
import { Box, useMediaQuery, Button, Stack, Input, IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { theme } from 'integrador/styles/material-theme';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useChargeMoney from 'integrador/components/contexts/useChargeMoney';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useStep from '../contexts/useStep';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export const AmountSelection = () => {

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }

        if(chargeMoneyState.method.amount > 0){
            setDisabledButton(false);
        }
      }, [])

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const {state: chargeMoneyState, dispatch: chargeMoneyDispatch} = useChargeMoney();
    const {dispatch: stepperDispatch } = useStep();

    const [selectedAmount, setSelectedAmount] = useState<number>(0.0);
    const [disabledButton, setDisabledButton] = useState(true);
    const router = useRouter();  

    const confirmAmount = () => {

        if(selectedAmount == 0 && chargeMoneyState.method.amount > 0) {
            chargeMoneyDispatch({type: "SET_AMOUNT", payload: chargeMoneyState.method.amount});
            stepperDispatch({type: "SET_STEP", payload: 2 });
        }

        else {
            chargeMoneyDispatch({type: "SET_AMOUNT", payload: selectedAmount});
            stepperDispatch({type: "SET_STEP", payload: 2 });
        }

    }

    const setAmountValue = (amount: string) => {

        setSelectedAmount(parseFloat(amount));
        
        if(parseFloat(amount) == 0 || amount.length == 0)
            setDisabledButton(true);
        else setDisabledButton(false);
    }

    return (
            <>
                <Box sx={{
                    backgroundColor: 'primary.main', 
                    width: '100%', 
                    borderRadius: '10px',
                    padding:'1.5rem 1.5rem',
                    marginBottom: '2rem'
                }}>
                    <Box width={'100%'} display='flex' alignItems='center'>
                        <Typography variant={'h4'} color='secondary'>¿Cuánto querés ingresar a la cuenta?</Typography>
                        <Tooltip title="Ingresa un monto mayor a $0">
                            <IconButton>
                                <InfoOutlinedIcon fontSize='small' sx={{color: 'text.secondary'}}/>
                            </IconButton> 
                        </Tooltip> 
                    </Box>
                    
                    <Box sx={{
                        backgroundColor: 'white', 
                        width: laptopOrDesktop ? '50%' : '100%', 
                        borderRadius: '10px',
                        padding:'1rem 1rem',
                        marginTop: '1rem',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography marginRight={'2px'}>$</Typography>
                        <Input 
                            type='number'
                            size='medium'
                            sx={{padding: '0', margin: '0', fontSize: mobile ? '12pt': '13pt', height: '100%', width: '100%',
                            [`& .MuiInputBase-input`]: {height: '100%', padding: '0'}}}
                            placeholder={chargeMoneyState.method.amount == 0 ? '0' : ''}
                            defaultValue={chargeMoneyState.method.amount == 0 ? '': chargeMoneyState.method.amount}
                            disableUnderline={true}
                            onChange={event => setAmountValue(event.target.value)}
                        />
                    </Box>

                    {!mobile && 
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'end', 
                        alignItems: 'center', 
                        m: '0.75rem 0 0.75rem'
                        }} 
                    >
                        <Button color="secondary" variant="contained" disabled={disabledButton} size='large' sx={{width: laptopOrDesktop ? '20%' : '100%', padding: laptopOrDesktop ? 'default' : '1rem 0'}} onClick={() => confirmAmount()}>
                            Continuar
                        </Button>
                    </Box>
                    }
                </Box>
                
                {mobile && 
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'center'}}>
                    <Button color="secondary" variant="contained" disabled={disabledButton} size='large' sx={{width: '50%'}}onClick={() => confirmAmount()}>
                        Continuar
                    </Button>
                </Box>}
           
            </>
    )
}
