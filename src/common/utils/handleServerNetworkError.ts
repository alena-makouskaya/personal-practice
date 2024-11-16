import { Dispatch } from "redux";
import { setAppErrorAC, setAppStatusAC } from "../../api/app-reducer";

export const handleServerNetworkError = (error : {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC("failed"))
}