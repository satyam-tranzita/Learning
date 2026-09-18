import {createStore} from "redux"
import CountReducer from "./reducer"

export const store=createStore(CountReducer)