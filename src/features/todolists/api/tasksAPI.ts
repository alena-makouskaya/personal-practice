import { instance } from "../../../common/instance/instance"
import { BaseResponseType } from "../../../common/types/types"
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "./tasksAPI.types"


export const tasksAPI = {
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string){
        return instance.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },

   updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

   deleteTask(todolistId: string, taskId: string){
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },


}