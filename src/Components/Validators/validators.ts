export const loginValidator = (login: string) => {
    const loginPattern = /^[a-zA-Z0-9]{5,15}$/
    return loginPattern.test(login)
}

export const passwordValidator = (password: string) => {
    const passwordValidator = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,100}$/
    return passwordValidator.test(password)
}

export const emailValidator = (email: string) => {
    const emailValidator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailValidator.test(email)
}

export const registrationValidation = (login: string, email: string, password: string) => {
    if (loginValidator(login) && passwordValidator(password) && emailValidator(email)) {
        return "";
    } else if (login.length < 5 || login.length > 10) {
        return 'Логин должен состоять из 5-10 символов'
    } else if (!loginValidator(login)) {
        return "Логин может содержать только цифры и латиницу"
    } else if (password.length < 8) {
        return "Пароль должен содержать мимнимум 8 символов"
    } else if (!passwordValidator(password)) {
        if (!/^(?=.*[!@#$%^&*]).{8,100}$/.test(password)) {
            return "Пароль должен содержать спец. символы"
        } else if (!/^(?=.*[0-9]).{8,100}$/.test(password)) {
            return "Пароль должен содержать хоть одну цифру"
        } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,100}$/.test(password)) {
            return "Пароль должен содержать прописные и заглавные буквы"
        }
    } else if (!emailValidator(email)) {
        return 'Некорректный адрес электронной почты'
    } else {
        return 'что-то не так'
    }
}
