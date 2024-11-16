import { instance } from "../../../common/instance/instance";
import { BaseResponseType } from "../../../common/types/types";
import { TodolistType } from "./todolistsAPI.types";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<BaseResponseType<{item: TodolistType}>>(`todo-lists`, {title});
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
  },


};
