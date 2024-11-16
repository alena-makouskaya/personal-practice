import { Dispatch } from "redux"
import { BaseResponseType } from "../types/types"
import { setAppErrorAC, setAppStatusAC } from "../../api/app-reducer"

export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
    } else {
      dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
  }
  