import {
    createContext,
    FC,
    useReducer,
    useMemo,
    Dispatch,
  } from "react";
  import { PropsWithChildren } from "react";

export type ProfileUser = {
    email: string | null | undefined,
    firstname: string | null | undefined,
    lastname: string | null | undefined,
    password: string | null | undefined,
    phone: string | null | undefined,
    alias: string | null | undefined,
    cvu: string | null | undefined,
    dni: string | number | undefined | null
};
  
export interface ProfileState {
  user: ProfileUser;
}

export type ProfileAction = 
  | { type: 'email', payload: string | null | undefined}
  | { type: 'firstname', payload: string | null | undefined}
  | { type: 'lastname', payload: string | null | undefined}
  | { type: 'password', payload: string | null | undefined}
  | { type: 'phone', payload: string | null | undefined}
  | { type: 'alias', payload: string | null | undefined}
  | { type: 'cvu', payload: string | null | undefined}
  | { type: 'dni', payload: string | null | undefined}
  
type ProfileActionType = ProfileAction;

export interface ProfileContextState {
    state: { user: ProfileUser };
    dispatch: Dispatch<ProfileActionType>;
}

export const ProfileContext = createContext<ProfileContextState | undefined>(undefined);

  
const reducer = (state: ProfileState, action: ProfileActionType): ProfileState => {
    switch (action.type) {
      case "email":
        return {
          user: {
            ...state.user,
            email: action.payload
          },
        };
        case "firstname":
          return {
            user: {
              ...state.user,
              firstname: action.payload
            },
          };
        case "lastname":
          return {
            user: {
              ...state.user,
              lastname: action.payload
            },
          };
        case "password":
          return {
            user: {
              ...state.user,
              password: action.payload
            },
          };
        case "phone":
          return {
            user: {
              ...state.user,
              phone: action.payload
            },
          };
        case "alias":
          return {
            user: {
              ...state.user,
              alias: action.payload
            },
          };
        case "cvu":
          return {
            user: {
              ...state.user,
              cvu: action.payload
            },
        };
        case "dni":
          return {
            user: {
              ...state.user,
              dni: action.payload
            },
        };
        default: 
          return {
              ...state
          }
    }
  };
  
const initialState: ProfileState = {
  user: {} as ProfileUser
};

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({state, dispatch,}), [state, dispatch]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
  