// @flow
import * as React from "react";
import { Todolists } from "../features/todolists/ui/Todolists";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { AppRootState, useAppDispatch } from "../app/store";
import { createTodolistTC } from "../features/model/todolists-reducer";
import { LinearProgress } from "../common/components/LinearProgress/LinearProgress";
import { useSelector } from "react-redux";
import { RequestStatus } from "./app-reducer";
type Props = {};

export const Main = (props: Props) => {
  const dispatch = useAppDispatch();

  const status = useSelector<AppRootState, RequestStatus>(
    (state) => state.app.status
  );



  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  return (
    <div className="main">
      {status === "loading" && <LinearProgress />}

      <AddItemForm callBack={createTodolist} />
      <Todolists />
    </div>
  );
};
