// @flow
import * as React from "react";
import { useAppDispatch } from "../../../../../app/store";
import {
  changeTodolistFilterAC,
  filterValueType,
  TodolistTomainType,
} from "../../../../model/todolists-reducer";
import { useDispatch } from "react-redux";

type Props = {
  todolist: TodolistTomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const changeTodolistFilter = (filter: filterValueType) => {
    dispatch(changeTodolistFilterAC(todolist.id, filter));
  };

  return (
    <div className="filterTasksButtons">
      <button
        onClick={() => changeTodolistFilter("all")}
        className={
          todolist.filter === "all" ? "filterButtonActive" : "filterButton"
        }
      >
        All
      </button>
      <button
        onClick={() => changeTodolistFilter("active")}
        className={
          todolist.filter === "active" ? "filterButtonActive" : "filterButton"
        }
      >
        Active
      </button>
      <button
        onClick={() => changeTodolistFilter("completed")}
        className={
          todolist.filter === "completed" ? "filterButtonActive" : "filterButton"
        }
      >
        Completed
      </button>
    </div>
  );
};
