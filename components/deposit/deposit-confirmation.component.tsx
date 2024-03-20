import * as React from 'react';
import { Box, useMediaQuery, Button, Stack, Input, Toolbar, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { theme } from 'integrador/styles/material-theme';
import { useState, useEffect, FC } from 'react';
import { useRouter } from "next/router";
import useChargeMoney from 'integrador/components/contexts/useChargeMoney';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { POST_DEPOSIT } from 'integrador/pages/api/api';
import useStep from '../contexts/useStep';

type DepositConfirmationProps = {
    page: "card" | "transferences"
}

export const DepositConfirmation: FC<DepositConfirmationProps> = ({page}: DepositConfirmationProps) => {

    const [cvu, setCvu] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [accountId, setAccountId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }        

        setCvu(localStorage.getItem("cvu"));
        setToken(token);
        setAccountId(localStorage.getItem('account_id'));
      }, [])

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    const { state: chargeMoneyState} = useChargeMoney();
    const { dispatch: stepperDispatch } = useStep();


    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const router = useRouter();

    const confirmDeposit = () => {

        const date = new Date().setHours(new Date().getHours() - 3);
        const ISOdate = new Date(date).toISOString()

        const body = {
            amount: chargeMoneyState.method.amount,
            destination: cvu,
            origin: chargeMoneyState.method.account,
            dated: ISOdate
        }

        console.log(JSON.stringify(body))

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : (token ? token : '0')
            },
            body: JSON.stringify(body)
        }

        setLoading(true);

        fetch(POST_DEPOSIT(accountId as string), requestOptions)
            .then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    console.log(data);
                    setLoading(false);
                    window.history.pushState({ prevUrl: "/cargarDinero/tarjeta" }, "", `/detalle/${data.id}`)
                    router.push(`/detalle/${data.id}`);   
                }else {
                    setError("Error 1");
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error.message)
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                setLoading(false);

            })
    }

    return (

            <>
                <Stack sx={{
                    backgroundColor: 'primary.main', 
                    width: '100%', 
                    borderRadius: '10px',
                    padding:'1.5rem 1.5rem',
                    marginBottom: '2rem'
                    }}
                    spacing={laptop ? 1.3 : 2.5 }
                >
                    <Typography variant={'h4'} color='secondary'>Revisá que está todo bien</Typography>
                    <Box display={'flex'} width='100%'>
                        <Box width={laptopOrDesktop ? '30%': mobile ? '85%': '60%'}>
                            <Typography color={'text.secondary'}>Vas a ingresar</Typography>
                            <Typography color={'text.secondary'} fontWeight='bold'>${chargeMoneyState.method.amount}</Typography>
                        </Box>
                        <Tooltip title={"Editar monto"} sx={{cursor: 'pointer'}}>
                            <EditOutlinedIcon color='secondary' sx={{height: '100%'}} onClick={() => stepperDispatch({type: "SET_STEP", payload: 1})}/>
                        </Tooltip>
                    </Box>
                    <Box display={'flex'} width='100%'>
                        <Box width={laptopOrDesktop ? '30%': mobile ? '85%': '60%'}>
                            <Typography color={'text.secondary'}>Desde</Typography>
                            {page == "card" &&  <Typography color={'text.secondary'} fontWeight='bold'>Tarjeta terminada en {chargeMoneyState.method.account.slice(-4)}</Typography>}
                            {page == "transferences" &&  
                                <>
                                    <Typography color={'text.secondary'} fontWeight='bold'>Cuenta externa</Typography>
                                    <Typography color={'text.secondary'} fontWeight='bold'>CVU {chargeMoneyState.method.account}</Typography>
                                </>
                            }
                        </Box>
                        <Tooltip title={"Editar los datos"} sx={{cursor: 'pointer'}}>
                            <EditOutlinedIcon color='secondary' sx={{height: '100%'}} onClick={() => stepperDispatch({type: "SET_STEP", payload: 0})}/>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Typography color={'text.secondary'}>Para</Typography>
                        <Typography color={'text.secondary'} fontWeight='bold'>Cuenta propia</Typography>
                        <Typography color={'text.secondary'}>Digital Money House</Typography>
                        <Typography color={'text.secondary'}>CVU {cvu}</Typography>
                    </Box>


                    {!mobile && 
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'end', 
                        alignItems: 'center', 
                        m: '0.75rem 0 0.75rem'
                        }} 
                    >
                        <Button color="secondary" variant="contained" size='large' sx={{width: laptopOrDesktop ? '20%' : '100%', padding: laptopOrDesktop ? 'default' : '1rem 0'}} onClick={confirmDeposit} disabled={error.length > 0}>
                            Continuar
                        </Button>
                    </Box>
                    }

                </Stack>
                    

                {mobile && 
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'center'}}>
                    <Button color="secondary" variant="contained" size='large' sx={{width: '50%'}} onClick={confirmDeposit} disabled={error.length > 0}>
                        Continuar
                    </Button>
                </Box>}

                {error.length > 0 && 
                    <Typography width={'100%'} textAlign='center' variant='body1' color='error'>Error al realizar la transferencia. Inténtelo de nuevo más tarde.</Typography>
                }
           
            </>
    )
}