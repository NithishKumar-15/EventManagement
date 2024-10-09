import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./Reducers/registrationReducer";
import loginReducer from "./Reducers/loginReducer";
import homeReducer from "./Reducers/homeReducer";

const store=configureStore({
    reducer:{
        registrationReducer,
        loginReducer,
        homeReducer
    }
})

export default store;