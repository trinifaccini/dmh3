import {
    createContext,
    FC,
    useReducer,
    useMemo,
    Dispatch,
  } from "react";
  import { PropsWithChildren } from "react";

// export type AccountOrCard = {
//     account: string
// }

// export type AmountCharge = {
//     amount: number
// }

export type ChargeMoney = {
  account: string,  //cbu or card
  amount: number
}
  
  export interface ChargeMoneyState {
    method: ChargeMoney;
  }
  
  export interface ChargeMoneyContextState {
    state: { method: ChargeMoney };
    dispatch: Dispatch<ChargeMoneyActionType>;
  }
  
  export const ChargeMoneyContext =
    createContext<ChargeMoneyContextState | undefined>(undefined);
  
  type SetAccount = {
    type: "SET_ACCOUNT";
    payload: string;
  };
  
  type SetAmount = {
    type: "SET_AMOUNT";
    payload: number;
  };
  
  
  type ChargeMoneyActionType =
    | SetAccount
    | SetAmount
  
  const reducer = (state: ChargeMoneyState, action: ChargeMoneyActionType): ChargeMoneyState => {
    switch (action.type) {
      case "SET_ACCOUNT":
        return {
          ...state,
          method: {
            ...state.method,
            account: action.payload
          },
        };
      case "SET_AMOUNT":
        return {
          ...state,
          method: {
            ...state.method,
            amount: action.payload
          },
        };
        };
    }
  
  const initialState: ChargeMoneyState = {
    method: {
      account: '',
      amount: 0
    },
  };
  
  export const ChargeMoneyProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(
      () => ({
        state,
        dispatch,
      }),
      [state, dispatch]
    );
  
    return (
      <ChargeMoneyContext.Provider value={value}>{children}</ChargeMoneyContext.Provider>
    );
  };
