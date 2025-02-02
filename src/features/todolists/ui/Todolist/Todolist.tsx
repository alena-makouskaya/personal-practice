// @flow
import * as React from "react";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm";
import { Tasks } from "./Tasks/Tasks";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import {  TodolistTomainType } from "../../../model/todolists-reducer";

import { useAppDispatch } from "../../../../app/store";
import { createTaskTC } from "../../../model/tasks-reducer";

type Props = {
  todolist: TodolistTomainType
};

export const Todolist = ({todolist}: Props) => {

  const dispatch = useAppDispatch();

  const createTask = (title: string) => {
    dispatch(createTaskTC(todolist.id, title))
  }

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist}/>
      <AddItemForm callBack={createTask}/>
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist}/>
    </div>
  );
};
