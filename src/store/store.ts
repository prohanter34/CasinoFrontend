import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import rouletteSlice from "./rouletteReducer";
import betHistorySlice from "./betHistoryReducer";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        roulette: rouletteSlice.reducer,
        betHistory: betHistorySlice.reducer
    },
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   thunk: {
    //     extraArgument: { serviceApi }
    //   }
    // })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
