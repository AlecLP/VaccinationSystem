import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/UserSlice"
import vaccineReducer from "./vaccine/VaccineSlice"
import hospitalReducer from "./hospital/HospitalSlice"

let rootReducer = combineReducers({
  user: userReducer,
  vaccines: vaccineReducer,
  hospitals: hospitalReducer,
})

function logger({ getState }) {
    return next => action => {
      console.log('Dipatching Action: ', action)
      const returnValue = next(action)
  
      console.log('State after dispatch: ', getState())

      return returnValue
    }
}

export default configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})