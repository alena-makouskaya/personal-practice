// @flow
import * as React from "react";

type Props = {
  value: string;
  callBack: (title: string) => void;
};

export const EditableSpan = ({ value, callBack }: Props) => {
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
    setInputValue(value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    callBack(inputValue);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  return (
    <>
      {" "}
      {editMode ? (
        <input
          value={inputValue}
          onChange={changeInputValueHandler}
          onBlur={activateViewMode}
          onKeyDown={onKeyDown}
          type="text"
          className="editableSpan"
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{value}</span>
      )}{" "}
    </>
  );
};
