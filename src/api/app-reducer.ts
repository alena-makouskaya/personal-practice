import { error } from "console";

const initialState = {
  status: "idle" as RequestStatus,
  error: null as string | null
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET-APP-STATUS":
        return {...state, status: action.status}

    case "SET-APP-ERROR": 
      return {...state, error: action.error}

    default:
      return state;
  }
};

// types

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type InitialStateType = typeof initialState;

// action creators

type ActionsType = SetAppStatusActionType | SetAppErrorActionType;

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;

export const setAppStatusAC = (status: RequestStatus) =>
  ({ type: "SET-APP-STATUS", status } as const);

export const setAppErrorAC = (error: string | null) =>
  ({ type: "SET-APP-ERROR", error } as const);
