import { RootState } from "./store";


export const selectLogin = (state: RootState) => {
    return state.auth.me.login
}

export const selectResultCode = (state: RootState) => {
    return state.auth.me.resultCode
}

export const selectEmail = (state: RootState) => {
    return state.auth.me.email
}

export const selectAuthMe = (state: RootState) => {
    return state.auth.me
}
