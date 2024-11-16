// @flow
import * as React from "react";
import { deleteTodolistTC, TodolistTomainType, updateTodolistTC } from "../../../../model/todolists-reducer";
import { EditableSpan } from "../../../../../common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "../../../../../app/store";
type Props = {
  todolist: TodolistTomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {

  const dispatch = useAppDispatch()

  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTC(todolist.id, title))
  }

  const deleteTodolist = () => {
    dispatch(deleteTodolistTC(todolist.id))
  }

  return (
    <div className="todolistTitle">
      <h3>
        <EditableSpan value={todolist.title} callBack={updateTodolist} />
      </h3>
      <button onClick={deleteTodolist} className="errorButton"> x </button>
    </div>
  );
};
