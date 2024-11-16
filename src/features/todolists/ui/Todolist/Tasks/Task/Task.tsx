// @flow
import * as React from "react";
import { TaskType } from "../../../../api/tasksAPI.types";
import { TaskStatuses } from "../../../../../../common/enums/enums";
import { useAppDispatch } from "../../../../../../app/store";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { deleteTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer";
import { TodolistTomainType } from "../../../../../model/todolists-reducer";
type Props = {
  todolist: TodolistTomainType
  task: TaskType;
};

export const Task = ({ todolist, task }: Props) => {
  let dispatch = useAppDispatch();

  const updateTask = (title: string) => {
    dispatch(updateTaskTC(todolist.id, task.id, { title }));
  };

  const updateTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    dispatch(updateTaskTC(task.todoListId, task.id, { status }));
  };

  const deleteTask = () => {
    dispatch(deleteTaskTC(task.todoListId, task.id));
  };

  return (
    <div className="task">
      <div className="taskInput">
        <input
          type="checkbox"
          className="taskCheckbox"
          checked={task.status === TaskStatuses.Completed ? true : false}
          onChange={updateTaskStatus}
        />
        <EditableSpan value={task.title} callBack={updateTask} />
      </div>
      <button className="errorButton" onClick={deleteTask}>
        {" "}
        x{" "}
      </button>
    </div>
  );
};
