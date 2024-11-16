import { TodolistType } from "../todolists/api/todolistsAPI.types";
import { Dispatch } from "redux";
import { todolistsAPI } from "../todolists/api/todolistsAPI";
import { setAppStatusAC } from "../../api/app-reducer";
import { ResultCode, TaskStatuses } from "../../common/enums/enums";
import { handleServerAppError } from "../../common/utils/handleServerAppError";
import { error } from "console";
import { handleServerNetworkError } from "../../common/utils/handleServerNetworkError";

// initial state
let initialState: Array<TodolistTomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistTomainType> = initialState,
  action: ActionsType
): Array<TodolistTomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }));

    case "CREATE-TODOLIST":
      return [{ ...action.todolist, filter: "all" }, ...state];

    case "UPDATE-TODOLIST":
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, title: action.title } : tl
      );

    case "DELETE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistId);

    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl
      );

    default:
      return state;
  }
};

// types
type ActionsType =
  | SetTodolistsActionType
  | CreateTodolistActionType
  | UpdateTodolistActionType
  | DeleteTodolistActionType
  | ChangeTodolistFilterActionType;

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>;
export type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>;
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

export type filterValueType = "all" | "active" | "completed";
export type TodolistTomainType = TodolistType & { filter: filterValueType };

// action creators
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

export const createTodolistAC = (todolist: TodolistType) =>
  ({ type: "CREATE-TODOLIST", todolist } as const);

export const updateTodolistAC = (todolistId: string, title: string) =>
  ({ type: "UPDATE-TODOLIST", todolistId, title } as const);

export const deleteTodolistAC = (todolistId: string) =>
  ({ type: "DELETE-TODOLIST", todolistId } as const);

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: filterValueType
) => ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const);

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTodolistsAC(res.data));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(createTodolistAC(res.data.data.item));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTodolistTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));

    todolistsAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(updateTodolistAC(todolistId, title));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const deleteTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(deleteTodolistAC(todolistId));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
  };

  // personal-practice-01