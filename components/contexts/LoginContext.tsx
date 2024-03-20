import {
    createContext,
    FC,
    useReducer,
    useMemo,
    Dispatch,
  } from "react";
  import { PropsWithChildren } from "react";
import { UserEmailData } from "../forms/logIn/log-in-email-form.component";
import { UserPasswordData } from "../forms/logIn/log-in-password-form.component";

export type UserLogin = {
  email: string,
  password: string
}
  
  export interface LoginState {
    user: UserLogin;
  }
  
  export interface LoginContextState {
    state: { user: UserLogin };
    dispatch: Dispatch<UserActionType>;
  }
  
  export const LoginContext =
    createContext<LoginContextState | undefined>(undefined);
  
  type SetEmail = {
    type: "SET_EMAIL";
    payload: UserEmailData;
  };
  
  type SetPassword = {
    type: "SET_PASSWORD";
    payload: UserPasswordData;
  };
  
  
  type UserActionType =
    | SetEmail
    | SetPassword
  
  const reducer = (state: LoginState, action: UserActionType): LoginState => {
    switch (action.type) {
      case "SET_EMAIL":
        return {
          ...state,
          user: {
            ...state.user,
            email: action.payload.email
          },
        };
      case "SET_PASSWORD":
        return {
          ...state,
          user: {
            ...state.user,
            password: action.payload.password
          },
        };
        };
    }
  
  const initialState: LoginState = {
    user: {} as UserLogin,
  };
  
  export const LoginProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(
      () => ({
        state,
        dispatch,
      }),
      [state, dispatch]
    );
  
    return (
      <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    );
  };