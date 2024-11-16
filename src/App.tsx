import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./api/Main";
import { ErrorSnackbar } from "./common/components/ErrorSnackbar/ErrorSnackbar";
import { AppRootState, useAppDispatch } from "./app/store";
import { useSelector } from "react-redux";

function App() {


  return (
    <div className="App">
      <ErrorSnackbar />

      <Main />
    </div>
  );
}

export default App;
