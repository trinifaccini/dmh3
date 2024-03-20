import * as React from 'react';
import { Box, Input, Typography, useMediaQuery } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import usePrueba from 'integrador/components/contexts/useProfile';
import { theme } from 'integrador/styles/material-theme';
import { setDefaultResultOrder } from 'dns';
import useProfile from 'integrador/components/contexts/useProfile';
import NewEmailform from '../email/email-form.component';

type ProfileInputProps = {
    field: string,
    nonEditable?: boolean,
    hide?: boolean
    data: "email" | "firstname" | "lastname" | "password" | "phone" | "alias" | "dni"
    error: string,
    cancel: boolean,
    setChange: Dispatch<SetStateAction<boolean>>,
}

const ProfileInput: FC<ProfileInputProps> = ({cancel, nonEditable, hide, field, data, setChange, error}: ProfileInputProps) => {

    const regExp = /[\W\w]/g;

    const {state, dispatch} = useProfile();

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

    const [actualValue, setActualValue] = useState<string | undefined >(state.user[data]?.toString());
    const [originalValue, setOriginalValue] = useState<string | undefined >(state.user[data]?.toString());
    const [isPencilClicked, setPencilClicked] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [fieldOpacity, setFieldOpacity] = useState("50%");

    const pencilClick = () => {
        setPencilClicked(true)
        setIsBold(true);
    }

    const dispatchData = () => {
        switch(data){
            case "firstname":
                dispatch({type: 'firstname', payload: actualValue});
                break;
            case "lastname":
                dispatch({type: 'lastname', payload: actualValue});
                break;
            case "password":
                dispatch({type: 'password', payload: actualValue});
                break;
            case "phone":
                dispatch({type: 'phone', payload: actualValue});
                break;                
        }
    }

    const doneInputActions = () => {

        setPencilClicked(false);

        if(actualValue !== originalValue) {
            setChange(true);
            dispatchData();
            setFieldOpacity("100%");
        }

        else {
            setIsBold(false);
            setFieldOpacity("50%");
        }
    }

    const exitInputActions = () => {
        setPencilClicked(false);
        setIsBold(false);
        setActualValue(originalValue);
        setFieldOpacity("50%");
    }

    useEffect(() => {        
        setActualValue(originalValue);
        setFieldOpacity("50%");
        setIsBold(false);
    }, [error, cancel])

	return (
        <Box 
            display='flex' 
            flexWrap='wrap' 
            alignItems='center'
            height='2.5rem'
        >
            <Typography fontWeight={isBold ? 'bold' : 'normal'} variant={'body2'} width={laptopOrDesktop ? '20%' : mobile ? '100%' : '35%'}>{field}</Typography>
            {nonEditable ? 
            (<Typography sx={{opacity:'50%'}} variant={'body2'}>{actualValue}</Typography>) : 
            !isPencilClicked ? 
            (
                <Box 
                    display='flex' 
                    justifyContent='space-between' 
                    alignItems='center' 
                    margin='0' 
                    padding='0' 
                    width={laptopOrDesktop ? '80%' : mobile ? '100%' : '65%'}
                >
                    <Typography variant={'body2'} sx={{opacity: fieldOpacity}}>{hide ? actualValue?.replaceAll(regExp, "*") : actualValue}</Typography> 
                    {field == "Email" ? 
                        <NewEmailform/> :
                        <Tooltip title="Editar">
                            <IconButton onClick={() => pencilClick()}>
                                <EditIcon fontSize='small' sx={{color: 'grey'}}/>
                            </IconButton> 
                        </Tooltip> 
                    }
                </Box>
            ) : 
            (
                <Box 
                    display='flex' 
                    justifyContent='space-between' 
                    alignItems='center' 
                    margin='0' 
                    padding='0' 
                    width={laptopOrDesktop ? '80%' : mobile ? '100%' : '65%'}
                >
                    <Input 
                        size='small'
                        sx={{padding: '0', margin: '0', fontSize: mobile ? '9pt': '11pt'}} 
                        value={actualValue} 
                        disableUnderline={true}
                        onChange={event => setActualValue(event.target.value)} 
                    />
                    <Box>
                        <Tooltip title="Cancelar">
                            <IconButton onClick={() => exitInputActions()}>
                                <ClearIcon fontSize='small'/>
                            </IconButton> 
                        </Tooltip>
                        <Tooltip title="Confirmar">
                            <IconButton onClick={() => doneInputActions()}>
                                <DoneIcon fontSize='small'/>
                            </IconButton> 
                        </Tooltip>
                    </Box>
                </Box>
            )}
        
        </Box>

	)
}


export default ProfileInput;