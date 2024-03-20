import {
  createContext,
  FC,
  useReducer,
  useMemo,
  Dispatch,
} from "react";
import { PropsWithChildren } from "react";

export type Step = {
  step: number;
};

export interface StepState {
  step: Step;
}

export interface StepContextState {
  state: { step: Step };
  dispatch: Dispatch<StepActionType>;
}

export const StepContext =
  createContext<StepContextState | undefined>(undefined);

type SetStep = {
  type: "SET_STEP";
  payload: number;
};

type StepActionType = SetStep;

const reducer = (state: StepState, action: StepActionType): StepState => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        step: { step: action.payload },
      };
  }
};

const initialStep: StepState = {
  step: {} as Step,
};

export const StepProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStep);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};
