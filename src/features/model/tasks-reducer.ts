
import {
  CreateTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import {
  TaskType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from "../todolists/api/tasksAPI.types";
import { Dispatch } from "redux";
import { tasksAPI } from "../todolists/api/tasksAPI";
import { AppRootState } from "../../app/store";
import { setAppStatusAC } from "../../api/app-reducer";
import { handleServerNetworkError } from "../../common/utils/handleServerNetworkError";
import { ResultCode } from "../../common/enums/enums";
import { handleServerAppError } from "../../common/utils/handleServerAppError";

// initialState

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionTypes
): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS":
      let stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;

    case "SET-TASKS":
      return { ...state, [action.todolistId]: action.tasks };

    case "CREATE-TODOLIST":
      return { ...state, [action.todolist.id]: [] };

    case "CREATE-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };

    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };

    case "DELETE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };

    default:
      return state;
  }
};

// types
type ActionTypes =
  | SetTodolistsActionType
  | SetTasksActionType
  | CreateTodolistActionType
  | CreateTaskActionType
  | UpdateTaskActionType
  | DeleteTaskActionType;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type CreateTaskActionType = ReturnType<typeof createTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

// actions creators

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
  ({ type: "SET-TASKS", todolistId, tasks } as const);

export const createTaskAC = (task: TaskType) =>
  ({ type: "CREATE-TASK", task } as const);

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateTaskModelType
) => ({ type: "UPDATE-TASK", todolistId, taskId, model } as const);

export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "DELETE-TASK", todolistId, taskId } as const);

//thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  tasksAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTasksAC(todolistId, res.data.items));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(createTaskAC(res.data.data.item));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ) =>
  (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState();

    const task = state.tasks[todolistId].find((task) => task.id === taskId);

    if (!task) {
      throw new Error("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    };

    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(updateTaskAC(todolistId, taskId, apiModel));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if(res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(deleteTaskAC(todolistId, taskId));
        } else {
          handleServerAppError(res.data, dispatch)
        }
 
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
