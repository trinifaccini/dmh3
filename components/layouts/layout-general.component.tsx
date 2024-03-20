import * as React from 'react';
import {FC, PropsWithChildren} from "react";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import GeneralHeader from "integrador/components/layouts/header/general-header.component";
import GeneralFooter from "integrador/components/layouts/footer/general-footer.component";


const GeneralLayout: FC<PropsWithChildren> = ({children}: PropsWithChildren) => {

    return (<>
            <Stack direction={"column"} height={'100%'}>
                <GeneralHeader/>
                <Box display={'flex'} flexGrow={1} justifyContent={'center'} marginBottom={'5vh'}>
                    {children}
                </Box>
                <GeneralFooter />
            </Stack>
        </>
    );
};
export default GeneralLayout;
