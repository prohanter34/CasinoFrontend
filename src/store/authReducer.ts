import { PayloadAction, ThunkAction, UnknownAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./store"
import { authAPI } from "../api/api"


type AuthStateType = {
    me: {
        login: string | null,
        email: string | null,
        cash: number | null,
        resultCode: number,
        hash: string | null,
        verify: boolean | null
    }
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: AuthStateType = {
    me: {
        login: null,
        email: null,
        cash: null,
        resultCode: 0,
        hash: null,
        verify: null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, login: PayloadAction<string>) => {
            state.me.login = login.payload
            debugger
        },
        setResultCode: (state, resultCode: PayloadAction<number>) => {
            state.me.resultCode = resultCode.payload
        },
        setAuthHash: (state, hashcode: PayloadAction<string>) => {
            state.me.hash = hashcode.payload
        },
        setEmail: (state, email: PayloadAction<string>) => {
            state.me.email = email.payload
        },
        setState: (state, data: PayloadAction<DataType>) => {
            state.me.login = data.payload.login
            state.me.email = data.payload.email
            state.me.cash = data.payload.cash
            state.me.verify = data.payload.verify
        }
    }
})

export const {setLogin, setResultCode, setAuthHash, setEmail, setState} = authSlice.actions

export const loginThunk = (login: string, password: string): AppThunk => (dispatch) => {
    authAPI.loginApi(login, password)
    .then((data) => {
        if (data.data.resultCode === 1000) {
            debugger
            dispatch(setLogin(login))
            dispatch(setState({
                login: data.data.login,
                email: data.data.email,
                cash: data.data.cash,
                verify: data.data.verify
            }))
            dispatch(setResultCode(data.data.resultCode))
        } else {
            dispatch(setResultCode(data.data.resultCode))
        }
    })
}

export const registerThunk = (login: string, password: string, email: string) => (dispatch: AppDispatch) => {
    authAPI.registerApi(login, email, password)
    .then((response) => {
        dispatch(setResultCode(response.data.resultCode))
        if (response.data.hash) {
            dispatch(setAuthHash(response.data.hash))
            dispatch(setEmail(email))
        }
    })
}

export const verifyEmailThunk = (verifyCode: number, hash: string, email: string) => (dispatch: AppDispatch) => {
    authAPI.verifyEmailApi(verifyCode, hash, email)
    .then((data): void => {
        debugger
        dispatch(setResultCode(data.data.resultCode))
    })
}

export default authSlice



type DataType = {
    login: string
    email: string
    cash: number
    verify: boolean
}