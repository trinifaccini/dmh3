import {
    createContext,
    FC,
    useReducer,
    useMemo,
    Dispatch,
  } from "react";
  import { PropsWithChildren } from "react";

  export type PaymentMethod = {
    paymentMethod: string,
    cardId?: string
  }

export type PaymentService = {
  accountNumber: string,  
  amount: number,
  service: string,
  step: number,
  paymentMethod: PaymentMethod
}
  
  export interface PaymentServiceState {
    method: PaymentService;
  }
  
  export interface PaymentServiceContextState {
    state: { method: PaymentService };
    dispatch: Dispatch<PaymentServiceActionType>;
  }
  
  export const PaymentServiceContext =
    createContext<PaymentServiceContextState | undefined>(undefined);
  
  type SetAccountNumber = {
    type: "SET_ACCOUNT";
    payload: string;
  };
  
  type SetAmount = {
    type: "SET_AMOUNT";
    payload: number;
  };

  type SetService = {
    type: "SET_SERVICE";
    payload: string;
  };
  
  type SetStep = {
    type: "SET_STEP";
    payload: number;
  };

  type SetPaymentMethod = {
    type: "SET_PAYMENT_METHOD";
    payload: PaymentMethod;
  };
  
  type PaymentServiceActionType =
    | SetAccountNumber
    | SetAmount
    | SetService
    | SetStep
    | SetPaymentMethod
  
  const reducer = (state: PaymentServiceState, action: PaymentServiceActionType): PaymentServiceState => {
    switch (action.type) {
      case "SET_ACCOUNT":
        return {
          ...state,
          method: {
            ...state.method,
            accountNumber: action.payload
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

        case "SET_SERVICE":
        return {
          ...state,
          method: {
            ...state.method,
            service: action.payload
          },
        };
        case "SET_STEP":
        return {
          ...state,
          method: {
            ...state.method,
            step: action.payload
          },
        };

        case "SET_PAYMENT_METHOD":
        return {
          ...state,
          method: {
            ...state.method,
            paymentMethod: action.payload
          },
        };
        };
    }
  
  const initialState: PaymentServiceState = {
    method: {
      accountNumber: "",
      amount: 0,
      service: "",
      step: 0,
      paymentMethod: {
        paymentMethod: ""
      }
    },
  };
  
  export const PaymentServiceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(
      () => ({
        state,
        dispatch,
      }),
      [state, dispatch]
    );
  
    return (
      <PaymentServiceContext.Provider value={value}>{children}</PaymentServiceContext.Provider>
    );
  };
