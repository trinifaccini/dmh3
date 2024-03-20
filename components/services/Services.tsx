import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Link from 'next/link';
import ControlledTextInput from "../forms/input/controlled-text-input.component";
import { FormProvider, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import {
  ListItemIcon,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { theme } from "integrador/styles/material-theme";

import { useRouter } from "next/router";
import "dayjs/locale/es";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Service } from "types/service.type";

export type SearchService = {
  searchService: string;
};


type ServicesProps = {
  services: Service[];
};

export default function Services({ services }: ServicesProps) {

  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const downLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const upMobile = useMediaQuery(theme.breakpoints.up("mobile"));
  const tablet = downLaptop && upMobile;

  const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up("desktop"));

  let laptop;
  if (laptopOrDesktop && !desktop)
    laptop = true;

  const router = useRouter();

  const [searchedServices, setSearchedServices] =  useState<Service[]>(services);

  const methods = useForm<SearchService>({ defaultValues: { searchService: "" } });

  const handleSearchService = (search: string) => {

    console.log('aca');
    

    const filteredArray = services.filter((ser) => {
      return ser.name.toLowerCase().indexOf(search.toLowerCase()) >= 0; 
    });

    setSearchedServices(filteredArray);
  };

  const placeholder = `Busca entre más de ${services.length.toString()} servicios`


  return (
    <Stack sx={{
          alignItems: 'center', 
          justifyContent: 'start',
          width: '90%'
      }} 
      spacing={laptop ? 1.3 : 2.5 }
      zIndex={3}
    >
      { mobile && 
        <Box sx={{
          display: 'flex', 
          alignItems: 'center', 
          width: '100%', 
          marginTop: '15px'}}>
          <ChevronRightIcon fontSize='small'sx={{color: 'grey'}}/>
          <Typography variant='body1'>Pagar servicios</Typography>
        </Box>
      }
      
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <FormProvider {...methods}>
          <Box sx={{ width: "100%" }}>
            <ControlledTextInput
              name="searchService"
              placeholder={placeholder}
              type="text"
              isNotGrid
              handleChangeCustom={handleSearchService}
            />
          </Box>
        </FormProvider>
      </Box>

      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "10px",
          padding: "1.5rem 1.5rem 1rem",
        }}
      >
      <Stack
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <Typography variant="h4" mb={mobile ? "0" : "0.5rem"}>Más recientes </Typography>
          <Divider sx={{ width: "100%", marginTop: '0.5rem'}} />
          {services &&
            searchedServices?.length > 0 ?
            searchedServices.slice(0,10).map((service) => {
                return (
                  <>
                    <ListItem sx={{ paddingLeft:'0px', paddingRight:'0px', paddingTop: '20px', paddingBottom: '20px'}}>
                      <ListItemIcon sx={{maxWidth:'20px'}}>
                        {/* <CircleIcon sx={{ color: "#C1FD35", fontSize: '2rem'}}/> */}
                        <img
                          src={service.icon}
                          alt={`${service.name}Icon`}
                          loading="lazy"
                          style={{width: '70px', maxHeight: '50px'}}
                        />
                      </ListItemIcon>
                      <ListItemText primary={service.name} sx={{ marginLeft: "40px"}} />
                      <Typography variant="h6" sx={{cursor: 'pointer'}} onClick={() => router.push(`/pagarServicios/${service.name}`)}>Seleccionar</Typography>
                    </ListItem>
                  <Divider sx={{ width: '100%'}} />
                  </>
                );
              })
            :
            <Typography>No hay servicios dispobibles</Typography>
          }
        </Stack>
        </Box>
      <Box sx={{ height: "6vh" }}></Box>
    </Stack> 
  );
}
