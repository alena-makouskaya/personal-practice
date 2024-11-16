// @flow
import * as React from "react";
import { AppRootState, useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
type Props = {};

export const ErrorSnackbar = (props: Props) => {
  const error = useSelector<AppRootState, string | null>(
    (state) => state.app.error
  );
  
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {error !== null && open && (
        <div className="errorSnackbar">
          <p>{error}</p>

          <button onClick={handleClose} className="errorButton">
            {" "}
            x{" "}
          </button>
        </div>
      )}
    </>
  );
};
