// @flow
import * as React from "react";
import { Task } from "./Task/Task";
import { AppRootState, useAppDispatch } from "../../../../../app/store";
import { useSelector } from "react-redux";
import { setTasksTC, TasksStateType } from "../../../../model/tasks-reducer";
import { TodolistTomainType } from "../../../../model/todolists-reducer";
import { TaskStatuses } from "../../../../../common/enums/enums";

type Props = {
  todolist: TodolistTomainType
};

export const Tasks = ({todolist}: Props) => {

  let dispatch = useAppDispatch()

  const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

  React.useEffect(() => {
    dispatch(setTasksTC(todolist.id))
  }, [])

  const tasksInTodolist = tasks[todolist.id]

  let filteredTasks = tasksInTodolist

  if(todolist.filter === "active") {
    filteredTasks = tasksInTodolist.filter((task) => task.status !== TaskStatuses.Completed)
  }

  if(todolist.filter === "completed") {
    filteredTasks = tasksInTodolist.filter((task) => task.status === TaskStatuses.Completed)
  }

  return (
    <div className="tasks">
      {
        filteredTasks.map((task) => (<Task key={task.id} todolist={todolist} task={task}/>))
      }
    </div>
  );
};
