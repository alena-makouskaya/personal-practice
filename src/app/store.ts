
import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { todolistsReducer } from "../features/model/todolists-reducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { tasksReducer } from "../features/model/tasks-reducer";
import { appReducer } from "../api/app-reducer";


const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducers, {}, applyMiddleware(thunk))
export const useAppDispatch = useDispatch<AppDispathType>

// types
export type AppRootState = ReturnType<typeof rootReducers>
export type AppDispathType = ThunkDispatch<AppRootState, unknown, UnknownAction>