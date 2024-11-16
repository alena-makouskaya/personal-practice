// @flow
import * as React from "react";

type Props = {
  callBack: (title: string) => void;
};

export const AddItemForm = ({callBack}: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const callBackHandler = () => {
    if (inputValue.trim() !== "") {
      callBack(inputValue.trim());
      setInputValue("");
    } else {
      setError("Title is required to enter");
    }
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      callBackHandler();
    }
  };



  return (
    <div className="addItemForm">
      <div className="addItem">
        <div className="inputForm">
          <label>Task title</label>
          <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} type="text" />
        </div>
        <button className="addItemButton" onClick={callBackHandler}>
          {" "}
          +{" "}
        </button>
      </div>

      <div className="errorText">{error}</div>
    </div>
  );
};
