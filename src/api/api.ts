import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export const authAPI = {
    loginApi: (login: string, password: string) => {
        return instance.post<LoginResponseType>("auth/login", {login, password})
    },
    registerApi: (login: string, email: string, password: string) => {
        return instance.post("auth/registration", {login, email, password})
    },
    logoutApi: () => {
        return instance.delete<ResultCodeResponseType>("auth/logout")
    },
    verifyEmailApi: (code: number, hashcode: string, email: string) => {
        return instance.post("auth/registration/verify", {code, hashcode: String(hashcode), email})
    },
    authWithCookies: () => {
        return instance.get<LoginResponseType>("auth")
    },
    changePassword: (oldPassword: string, newPassword: string) => {
        return instance.post<ResultCodeResponseType>("auth/changePass", {oldPassword, newPassword})
    }
}

export const cashAPI = {
    depositCashApi: (deposit: number, promo: string) => {
        return instance.post<ResultCodeResponseType>("cash/deposit", {deposit, promo})
    },
    checkPromoCode: (code: string) => {
        return instance.get<CheckPromoResponse>(`cash/promo/?code=${code}`)
    }
}

type CheckPromoResponse = {
    resultCode: number,
    coefficient: number
}

export const rouletteAPI = {
    makeBet: (cash: number, betType: string) => {
        return instance.post<ResultCodeResponseType>("roulette/bet", {betType, cash})
    },
    longpollResults: () => {
        return instance.get<ResultRouletteGameType>("roulette/result")
    },
    pingInfoAboutGame: () => {
        return instance.get<RouletteGameInfoPing>("roulette/ping")
    }
}

export const betHistoryAPI = {
    getHistory: () => {
        return instance.get<BetHistoryType>("account/betHistory")
    }
}

type BetHistoryType = {
    bets: Array<{
        bet: number,
        gain: number,
        game: string
    }>,
    resultCode: number,
}

type LoginResponseType = {
    email: string,
    login: string,
    cash: number,
    verify: boolean,
    resultCode: number
}

type ResultCodeResponseType = {
    resultCode: number
}

type ResultRouletteGameType = {
    resultCode: number
    number: number
}

type RouletteGameInfoPing = {
    cash: number,
    number: number | null,
    stage: 0 | 1,
    delta: number,
    resultCode: number
}
