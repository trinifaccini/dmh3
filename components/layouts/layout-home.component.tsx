import * as React from 'react';
import {FC, PropsWithChildren} from "react";
import GeneralHeader from "integrador/components/layouts/header/general-header.component";
import GeneralFooter from "integrador/components/layouts/footer/general-footer.component";
import { Box, Stack } from '@mui/material';
import DigitalMenu from '../menu/menu.component';


const PageHomeLayout: FC<PropsWithChildren> = ({children}: PropsWithChildren) => {

    return (<>
            <Stack direction={"column"}>
                <GeneralHeader variant={'home'}/>
                    <Box sx={{ display: 'flex' }} minHeight='90vh'>
                        <Box>
                            <DigitalMenu/>
                        </Box>
                        <Box display='flex' width={'100%'} flexGrow={1} justifyContent='center' sx={{backgroundColor: '#EEEAEA'}} >
                            {children}
                        </Box>
                    </Box>
                <GeneralFooter />
            </Stack>
        </>
    )
};

export default PageHomeLayout;