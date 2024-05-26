import { UnknownAction } from "redux"
import { AppDispatch, RootState } from "./store"
import { ThunkAction } from "redux-thunk"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { authByCookiesThunk, setState } from "./authReducer"
import { betHistoryAPI } from "../api/api"

type BetHistoryStateType = {
    bets: Array<BetType>
}

type BetType= {
    bet: number,
    game: string
    gain: number
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: BetHistoryStateType = {
    bets: []
}

const betHistorySlice = createSlice({
    name: "betHistory",
    initialState,
    reducers: {
        setBetHistoryState: (state, newState: PayloadAction<Array<BetType>>) => {
            state.bets = newState.payload
        },
        addBet: (state, bet: PayloadAction<BetType>) => {
            state.bets.push(bet.payload)
        }
    }
})

export const {setBetHistoryState, addBet} = betHistorySlice.actions

export const getBetHistoriThunk = () => (dispatch: AppDispatch) => {
    betHistoryAPI.getHistory()
    .then((data) => {
        if (data.data.resultCode === 5) {
            dispatch(authByCookiesThunk())
            dispatch(getBetHistoriThunk())
        } else if (data.data.resultCode === 103) {
            dispatch(setBetHistoryState(data.data.bets))
        }
    })
}

export default betHistorySlice