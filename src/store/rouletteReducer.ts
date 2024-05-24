import { PayloadAction, ThunkAction, UnknownAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./store"
import { rouletteAPI } from "../api/api"
import { authByCookiesThunk, setCash } from "./authReducer"


type RouletteStateType = {
    bet: number,
    betType: string,
    lastResult: number | null,
    stage: number,
    delta: number,
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: RouletteStateType = {
    bet: 0,
    betType: "",
    lastResult: null,
    stage: 0,
    delta: 0
}

const rouletteSlice = createSlice({
    name: "roulette",
    initialState,
    reducers: {
        makeBet: (state, bet: PayloadAction<BetType>) => {
            state.bet = bet.payload.bet
            state.betType = bet.payload.betType
        },
        setLastResult: (state, result: PayloadAction<number>) => {
            state.lastResult = result.payload
        }, setDeltaStage: (state, deltaStage: PayloadAction<{stage: number, delta: number}>) => {
            state.delta = deltaStage.payload.delta
            state.stage = deltaStage.payload.stage
        }
    }
})

export const {makeBet, setLastResult, setDeltaStage} = rouletteSlice.actions


export const makeBetThunk = (bet: number, betType: string) => (dispatch: AppDispatch) => {
    rouletteAPI.makeBet(bet, betType)
    .then((data) => {
        switch (data.data.resultCode) {
            case 103:
                dispatch(makeBet({bet, betType}))
                dispatch(checkResultsThunk())
                break;
            case 11:
                // говорит о том что сейчас не стадия ставок, мб как-то показать это в UI
                break;
            case 5:
                dispatch(authByCookiesThunk())
                dispatch(makeBetThunk(bet, betType))
                break;
        }
    })
}

export const checkResultsThunk = () => (dispatch: AppDispatch) => {
    rouletteAPI.longpollResults()
    .then((data) => {
        if (data.data.resultCode === 103) {
            dispatch(setLastResult(data.data.number))
        } else if (data.data.resultCode === 5) {
            // возможно стоит убрать это с бека, результат можно смортеть и без авторизации
            dispatch(authByCookiesThunk())
            dispatch(checkResultsThunk())
        }
    })
}

export const pingRouletteInfo = () => (dispatch: AppDispatch) => {
    rouletteAPI.pingInfoAboutGame()
    .then((data) => {
        if (data.data.resultCode === 103) {
            dispatch(setCash(data.data.cash))
            dispatch(setDeltaStage({delta: data.data.delta, stage: data.data.stage}))
        } else if (data.data.resultCode === 5) {
            dispatch(authByCookiesThunk())
            // dispatch(pingRouletteInfo())
        }
    })
}





export default rouletteSlice


type BetType = {
    bet: number,
    betType: string
}
