import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Link from 'next/link';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ControlledTextInput from "../forms/input/controlled-text-input.component";
import { FormProvider, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import {
  ListItemIcon,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { theme } from "integrador/styles/material-theme";
import {
  getMonthName,
  getMonthNumber,
  orderTransactionsByDate,
} from "../utils";
import FiltersMenu from "./FiltersMenu";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import "dayjs/locale/es";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type SearchTransaction = {
  searchTransaction: string;
};

export type Transaction = {
  account_id: number;
  amount: number;
  dated: string;
  description?: string;
  destination?: string;
  id: number;
  origin?: string;
  type: string;
};

type ActivitySummaryProps = {
  transactions: Transaction[] | undefined;
  home?: boolean;
};

export default function ActivitySummary({
  transactions,
  home,
}: ActivitySummaryProps) {
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
  const { search } = router.query;

  const [page, setPage] = useState(1);
  const [periodFilter, setPeriodFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>();

  const [searchedTransactions, setSearchedTransactions] =
    useState<Transaction[]>();

  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);
  dayjs.locale("dayjs/locale/es");

  const methods = useForm<SearchTransaction>({
    defaultValues: { searchTransaction: "" },
  });

  useEffect(() => {
    setFilteredTransactions(transactions);
    if (search && !home) {
      handleSearchTransactionQueryParams(search as string)
    } else {
      setSearchedTransactions(transactions)
    }
  }, []);


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const applyFilters = (
    period: string,
    transactionType: string,
    startDate?: string,
    endDate?: string
  ) => {
    
    const filteredTrans = transactions?.filter((transaction) => {
      return (
        filterPeriod(transaction, period, startDate, endDate) &&
        filterTransactionType(transaction, transactionType)
      );
    }) 

    setFilteredTransactions(filteredTrans);
    setSearchedTransactions(filteredTrans);
    if (period === "Todos") {
      setPeriodFilter("");
    } else {
      if (period === "Otro período") {
        setPeriodFilter(
          "Período: " +
          dayjs(startDate).format("DD/MM/YYYY") +
          "  al  " +
          dayjs(endDate).format("DD/MM/YYYY")
        );
      } else {
        setPeriodFilter(period);
      }
    }
    if (transactionType === "Todas") {
      setTypeFilter("");
    } else {
      setTypeFilter(transactionType);
    }
  };

  const filterPeriod = (
    transaction: Transaction,
    selectedPeriod: string,
    startDate?: string,
    endDate?: string
  ) => {
    switch (selectedPeriod) {
      case "Hoy":
        return dayjs().isSame(transaction.dated, "day");
      case "Ayer":
        return (
          dayjs(transaction.dated).format("MM-DD-YYYY") ===
          dayjs().subtract(1, "day").format("MM-DD-YYYY")
        );
      case "Última semana":
        return dayjs().isSame(transaction.dated, "week");
      case "Últimos 15 días":
        return dayjs(transaction.dated).isSameOrAfter(
          dayjs().subtract(14, "day")
        );
      case "Último mes":
        return dayjs().isSame(transaction.dated, "month");
      case "Último año":
        return dayjs().isSame(transaction.dated, "year");
      case "Otro período":
        return dayjs(transaction.dated).isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        );
      case "Todos":
        return true;
    }
  };

  const filterTransactionType = (
    transaction: Transaction,
    transactionType: string
  ) => {
    if (transactionType === "Ingresos") {
      return transaction.type === "Deposit";
    }
    if (transactionType === "Egresos") {
      return (
        transaction.type === "Transfer" || transaction.type === "Transaction"
      );
    }
    if (transactionType === "Todas") {
      return true;
    }
  };

  const handleSearchTransaction = (search: string) => {
    
    if (!home) {
      const filteredTrans = filteredTransactions?.filter((transaction) => {
        return transaction.description?.includes(search);
      });
      setSearchedTransactions(filteredTrans);
    }
  };

  const handleSearchTransactionQueryParams = (search: string) => {
    if (!home) {
      const filteredTrans = transactions?.filter((transaction) => {
        return transaction.description?.includes(search);
      });
      setSearchedTransactions(filteredTrans);
    }
  };

  const handleSearchHome = (e: any) => {
    if (home) {
      const keyCode = e.code || e.key;
      if (keyCode == "Enter") {
        if (e.target.value.trim()!=="") {
          router.push({
            pathname: "/actividad",
            query: { search: e.target.value },
          });
        } else {
          router.push("/actividad");
        }
      }
    }
  };

  return (
    <Stack sx={{
          alignItems: 'center', 
          justifyContent: 'start',
          width: '90%'
      }} 
      spacing={laptop ? 1.3 : 2.5 }
      zIndex={3}
    >
      {mobile && !home &&
        <Box sx={{
          display: 'flex', 
          alignItems: 'center', 
          width: '100%', 
          marginTop: '15px'}}>
          <ChevronRightIcon fontSize='small'sx={{color: 'grey'}}/>
          <Typography variant='body1'>Tu actividad</Typography>
        </Box>
      }
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <FormProvider {...methods}>
          <Box sx={{ width: home || mobile ? "100%" : tablet ? "60%" : "85%" }}>
            <ControlledTextInput
              name="searchTransaction"
              placeholder="Buscar en tu actividad"
              type="text"
              isNotGrid
              handleChangeCustom={handleSearchTransaction}
              onKeyPress={handleSearchHome}
              defaultValue={search? search as string : undefined}
            />
          </Box>
          {!home && !mobile && <FiltersMenu applyFilters={applyFilters} />}
        </FormProvider>
      </Box>
      {!home && (periodFilter || typeFilter) && (
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
          {<Typography sx={{ fontWeight: "bold" }}>Filtros: </Typography>}
          {typeFilter && (
            <Typography
              sx={{
                padding: "5px",
                backgroundColor: "#C1FD35",
                borderRadius: "6px",
                margin: "0 5px",
              }}
            >
              {typeFilter}
            </Typography>
          )}
          {periodFilter && (
            <Typography
              sx={{
                padding: "5px",
                backgroundColor: "#C1FD35",
                borderRadius: "6px",
                margin: "0 5px",
              }}
            >
              {periodFilter}
            </Typography>
          )}
        </Box>
      )}
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
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between !important",
              alignSelf: "flex-start",
              width: "100%",
            }}
          >
            <Typography variant="h4" mb={mobile ? "0" : "0.5rem"} width={mobile ? '60%' : '50%'}> Tu actividad </Typography>
            {!home && mobile && (
              <Box sx={{ display: "flex", alignItems: "center"}}>
                <FiltersMenu applyFilters={applyFilters} />
              </Box>
            )}
          </Box>
          <Divider sx={{ width: "100%", marginTop: '0.5rem'}} />
          {searchedTransactions &&
            searchedTransactions?.length > 0 &&
            orderTransactionsByDate(searchedTransactions)
              .slice(page * 10 - 10, page * 10)
              .map((transaction) => {
                return (
                  <>
                  <Link href={`/detalle/${transaction.id}`} key={transaction.id} style={{cursor:"pointer"}}>
                    <ListItem sx={{cursor:"pointer", paddingLeft:'0px', paddingRight:'0px'}}>
                      <ListItemIcon sx={{minWidth:'0'}}>
                        <CircleIcon sx={{ color: "#C1FD35", fontSize: '2rem'}}/>
                      </ListItemIcon>
                      <ListItemText
                        primary={transaction.description ? transaction.description : "Extrajiste dinero"}
                        sx={{ marginLeft: "10px"}} />
                      <Box>
                        <Typography variant="h6" textAlign={"right"}>
                          {" "}
                          {transaction.amount.toString()[0] == "-"
                            ? transaction.amount.toString().slice(0, 1) +
                            " $" +
                            transaction.amount.toString().slice(1) +
                            ",00"
                            : "$" + transaction.amount}
                        </Typography>
                        <Typography variant="body2" textAlign={"right"} color={"primary.light"}>
                          {mobile  ? getMonthNumber(transaction.dated) : getMonthName(transaction.dated)}
                        </Typography>
                      </Box>
                    </ListItem>
                  </Link>
                  <Divider sx={{ width: '100%'}} />
                  </>
                );
              })}
          {!filteredTransactions?.length && !home && (
            <Typography
              variant="h3"
              color="primary.light"
              sx={{
                margin: "auto",
                height: "25vh",
                marginTop: "230px",
                textAlign: "center",
              }}
            >
              No hay transacciones disponibles.
            </Typography>
          )}

          {home && searchedTransactions && searchedTransactions?.length > 0 && (
            <ListItem sx={{paddingLeft:'0px', paddingRight:'0px',cursor: "pointer"}}>
              <ListItemText primary="Ver toda tu actividad"/>
              <ArrowForwardIcon onClick={() => router.push("/actividad")}/>
            </ListItem>
          )}
          {!home && (
            <Box sx={{height: "50px",justifyContent: "center",marginTop: "5px"}} >
              <Pagination
                count={
                  (searchedTransactions &&
                    searchedTransactions?.length / 10 > 1 &&
                    Math.ceil(searchedTransactions?.length / 10)) ||
                  1
                }
                page={page}
                onChange={handleChange}
              />
            </Box>
          )}
        </Stack>
        {!filteredTransactions?.length && home && (
          <Typography variant="body1" m="0.5rem 0">
            Aún no tienes actividad
          </Typography>
        )}
      </Box>
      <Box sx={{ height: "6vh" }}></Box>
    </Stack>
  );
}
