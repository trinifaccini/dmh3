import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Menu,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { SyntheticEvent, useState } from "react";
import Calendar from "./Calendar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { theme } from "integrador/styles/material-theme";

type FiltersMenuProps = {
  applyFilters: (
    period: string,
    transactionType: string,
    startDate?: string,
    endDate?: string
  ) => void;
};

export default function FiltersMenu({ applyFilters }: FiltersMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Todos");
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>("Todas");
  const open = Boolean(anchorEl);

  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const desktop = useMediaQuery(theme.breakpoints.up("laptop"));


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePeriod = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setSelectedPeriod((event.target as HTMLInputElement).value);
  };

  const handleChangeTransactionType = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setSelectedTransactionType((event.target as HTMLInputElement).value);
  };

  const handleApply = () => {
    applyFilters(selectedPeriod, selectedTransactionType, startDate, endDate);
    handleClose();
  };

  const clearFilters = () => {
    applyFilters("Todos", "Todas");
    setSelectedPeriod("Todos");
    setSelectedTransactionType("Todas");
    setStartDate("");
    setEndDate("");
    handleClose();
  };

  return (
    <Box display={'flex'} justifyContent='space-between' flexWrap={'wrap'} sx={{width: mobile ? '50% !important' : desktop ? '13%' : "25%"}}>
      <Button
        variant="contained"
        color={!mobile ? "secondary" : "inherit"}
        onClick={handleClick}
        sx={{
          textTransform: "unset",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "17px",
          width: "100%",
          backgroundColor: mobile ? "transparent" : "",
          boxShadow: mobile ? "none" : "",
          borderRadius: '10px',
          padding: mobile ? '6px 0px 6px 16px' : '6px 16px'
        }}
      >
        Filtrar
        <TuneRoundedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            width: "320px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "380px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "bold",
                marginLeft: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Período
              <ExpandMoreIcon sx={{ marginTop: "3px" }} />
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearFilters}
              disabled={
                selectedPeriod === "Todos" &&
                selectedTransactionType === "Todas"
              }
              sx={{
                textTransform: "unset",
                fontSize: "15px",
                marginRight: "10px",
                borderRadius: "5px",
                padding: "7px",
                marginBottom: "5px",
              }}
            >
              Borrar filtros
            </Button>
          </Box>
          <Divider />
          <Box>
            <RadioGroup name="use-radio-group" sx={{ marginLeft: "15px" }}>
              <FormControlLabel
                value="Hoy"
                label="Hoy"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Hoy"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              <FormControlLabel
                value="Ayer"
                label="Ayer"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Ayer"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              <FormControlLabel
                value="Última semana"
                label="Última semana"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Última semana"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              <FormControlLabel
                value="Últimos 15 días"
                label="Últimos 15 días"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Últimos 15 días"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              <FormControlLabel
                value="Último mes"
                label="Último mes"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Último mes"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              <FormControlLabel
                value="Último año"
                label="Último año"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Último año"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              <FormControlLabel
                value="Otro período"
                label="Otro período"
                control={
                  <Radio sx={{ "span svg": { color: "#C1FD35 !important" } }} />
                }
                checked={selectedPeriod === "Otro período"}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  checked: boolean
                ) => handleChangePeriod(event, checked)}
              />
              {selectedPeriod === "Otro período" && (
                <Box
                  sx={{
                    width: "90%",
                    alignSelf: "flex-end",
                    "& input": {
                      width: "90%",
                      height: "33px",
                      textAlign: "center",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      borderColor: "#C1FD35",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Calendar
                    captureStartDate={setStartDate}
                    captureEndDate={setEndDate}
                  />
                </Box>
              )}
            </RadioGroup>
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Tipo de transacción</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0 !important" }}>
              <Box>
                <RadioGroup name="use-radio-group" sx={{ marginLeft: "15px" }}>
                  <FormControlLabel
                    value="Ingresos"
                    label="Ingresos"
                    control={
                      <Radio
                        sx={{ "span svg": { color: "#C1FD35 !important" } }}
                      />
                    }
                    checked={selectedTransactionType === "Ingresos"}
                    onChange={(
                      event: SyntheticEvent<Element, Event>,
                      checked: boolean
                    ) => handleChangeTransactionType(event, checked)}
                  />
                  <FormControlLabel
                    value="Egresos"
                    label="Egresos"
                    control={
                      <Radio
                        sx={{ "span svg": { color: "#C1FD35 !important" } }}
                      />
                    }
                    checked={selectedTransactionType === "Egresos"}
                    onChange={(
                      event: SyntheticEvent<Element, Event>,
                      checked: boolean
                    ) => handleChangeTransactionType(event, checked)}
                  />
                  <FormControlLabel
                    value="Todas"
                    label="Todas"
                    control={
                      <Radio
                        sx={{ "span svg": { color: "#C1FD35 !important" } }}
                      />
                    }
                    checked={selectedTransactionType === "Todas"}
                    onChange={(
                      event: SyntheticEvent<Element, Event>,
                      checked: boolean
                    ) => handleChangeTransactionType(event, checked)}
                  />
                </RadioGroup>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleApply}
            disabled={
              selectedPeriod === "Otro período" && (!startDate || !endDate)
            }
            sx={{
              textTransform: "unset",
              display: "flex",
              justifyContent: "space-around",
              fontWeight: "bold",
              fontSize: "17px",
              width: "90%",
              alignSelf: "center",
              marginTop: "10px",
              marginBottom: "15px",
              position: "sticky",
              bottom: "5px",
              "&.Mui-disabled": {
                backgroundColor: "rgb(209 209 209)",
              },
            }}
          >
            Aplicar
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}
