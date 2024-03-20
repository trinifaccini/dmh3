import { GET_ACCOUNT, GET_CARD, GET_CARDS, POST_TRANSACTION } from "integrador/pages/api/api";
import { Card } from "types/card.type";
import { boolean } from "yup";
import { Transaction } from "../activitySummary/ActivitySummary";
import { PaymentTransaction } from "./PaymentMethods";

export const getCards = async (token: string | null, account_id: string | null, setCards: (cards: Card[])=>void, setLoading: (loading:boolean)=>void, setError: (error: boolean)=>void) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: !token ? "0" : token,
      },
    };

    await fetch(GET_CARDS(account_id as string), requestOptions)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setCards(data);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
        setLoading(false);
        setError(true);
      });
  };

  export const getAmount = async (token: string, setAmount: (amount: number)=>void, setLoading: (loading: boolean)=>void,  setError: (error: boolean)=>void) => {
    const request = await fetch(GET_ACCOUNT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(async (res) => {
        const user = await res.json();
        if (res.status === 200) {
          setAmount(Math.trunc(user.available_amount));
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.warn(error.message);
        setAmount(0);
      });
  };

  export const tarjetaVencida = (expDate: string) => {
    const array = expDate.split("/");

    const currentYear = new Date().getFullYear().toString();
    const currentMonthWrong = new Date().getMonth();
    const currentMonth = (currentMonthWrong + 1).toString();

    if (array[1] < currentYear) return true;
    if (array[1] == currentYear && array[0] <= currentMonth) return true;
  };

  export const postPayment = async (token: string, account_id: string, data: PaymentTransaction, onSucces: ()=>void, onError: ()=>void) =>{
    await fetch(POST_TRANSACTION(account_id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token as string,
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        if(res.status=== 201){
          onSucces()
        }else{
         onError()
        }
      })
      .catch((error) => {
        onError()
        console.warn(error.message);
      });
  }

  export const getCard = async (token: string, account_id: string, cardId: string, setCard: (card: number)=>void, onError: ()=>void) =>{
    await fetch(GET_CARD(account_id, cardId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token as string,
      }
    })
      .then(async (res) => {
        if(res.status=== 200){
          const data = await res.json()
          setCard(data.number_id)
        }else{
         onError()
          console.warn("Ha ocurrido un error al obtener la tarjeta");
        }
      })
      .catch((error) => {
        onError()
        console.warn(error.message);
      });
  }
