import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';

let rootReducer = combineReducers({

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
},
{},//Initial state, if set from store instead of reducer
)