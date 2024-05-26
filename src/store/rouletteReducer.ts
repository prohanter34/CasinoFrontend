import { PayloadAction, ThunkAction, UnknownAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./store"
import { rouletteAPI } from "../api/api"
import { authByCookiesThunk, changeCash, setCash } from "./authReducer"


type RouletteStateType = {
    bet: number,
    betType: string,
    lastResult: number | null,
    stage: number,
    delta: number,
    resultCode: number,
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
    delta: 0,
    resultCode: 0,
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
        }, 
        setDeltaStage: (state, deltaStage: PayloadAction<{stage: number, delta: number}>) => {
            state.delta = deltaStage.payload.delta
            state.stage = deltaStage.payload.stage
        },
        setResultCode: (state, resultCode: PayloadAction<number>) => {
            state.resultCode = resultCode.payload
        }
    }
})

export const {makeBet, setLastResult, setDeltaStage, setResultCode} = rouletteSlice.actions


export const makeBetThunk = (bet: number, betType: string, cash: number) => (dispatch: AppDispatch) => {
    if (bet > cash) {
        dispatch(setResultCode(10))
    } else {
        rouletteAPI.makeBet(bet, betType)
        .then((data) => {
            debugger
            switch (data.data.resultCode) {
                case 103:
                    dispatch(makeBet({bet, betType}))
                    dispatch(checkResultsThunk())
                    dispatch(changeCash(-bet))
                    break;
                case 11:
                    // говорит о том что сейчас не стадия ставок, мб как-то показать это в UI
                    dispatch(setResultCode(1))
                    break;
                case 10:
                    dispatch(setResultCode(10))
                    break;
                case 5:
                    dispatch(authByCookiesThunk())
                    dispatch(makeBetThunk(bet, betType, cash))
                    break;
            }
        })
    }
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
