import * as React from 'react';
import {FC, PropsWithChildren} from "react";
import Container, {ContainerProps} from "@mui/material/Container";
import {Stack, Typography} from "@mui/material";

interface BodySingleProps extends PropsWithChildren {
    title?: string,
    containerProps?: ContainerProps
}

const BodySingle: FC<BodySingleProps> = ({title, containerProps, children}: BodySingleProps) => {
    return (
        // <Container maxWidth="xl" {...containerProps} sx={{justifyContent: 'center', backgroundColor: 'black', padding: '0'}}>
            <Stack 
             display='flex'
             flexWrap='wrap'
             direction="column"
             justifyContent='center'
             alignItems='center' 
             bgcolor='primary.main' 
             height='100%'
             sx={{justifyContent: 'center', backgroundColor: 'primary.main', padding: '0'}}
             width='100%'
             position='relative'
             >
                {children}
            </Stack>
        // </Container>
    );
};
export default BodySingle;
