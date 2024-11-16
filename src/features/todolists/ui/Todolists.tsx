// @flow
import * as React from "react";
import { Todolist } from "./Todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "../../../app/store";
import { setTodolistsTC, TodolistTomainType } from "../../model/todolists-reducer";


type Props = {};

export const Todolists = (props: Props) => {
  let dispatch = useAppDispatch()

  let todolists = useSelector<AppRootState, Array<TodolistTomainType>>(state => state.todolists)

  React.useEffect(() => {
    dispatch(setTodolistsTC())
  }, [])

  return (
    <div className="todolists">
      {
        todolists.map((todolist) => (<Todolist key={todolist.id} todolist={todolist}/>))
      }
    </div>
  );
};
