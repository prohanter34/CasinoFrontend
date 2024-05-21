import s from './Account.module.css'
import userPhoto from "../../../../img/user_photo.png"
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '../../../../store/authReducer'
import ChangePasswordWindow from './ChangePasswordWindow'
import { useState } from 'react'


type PropsType = {
    login: string | null,
    email: string | null,
    cash: number | null,
}

const AccountInfo = (props: PropsType) => {

    const dispatch = useDispatch<any>()
    const logoutOnClick = () => {
        dispatch(logoutThunk())
    }
    const [paswordChangeIsActive, setPaswordChange] = useState(false)
    const changePasswordOnClick = () => {
        setPaswordChange(!paswordChangeIsActive)
    }


    return (
        <div className={s.profile}>
            <div className={s.profile_flex}>
                <div className={s.photo}>
                    <img alt="" className={s.photo} src={userPhoto}></img>
                </div>
                <div className={s.info_container}>
                    <div className={s.login}>{props.login}</div>
                    <div className={s.email}>{props.email}</div>
                    <div className={s.cash}>Баланс: {props.cash}</div>
                    <div className={s.account_buttons}>
                        <Button type='dashed' onClick={logoutOnClick} danger={true} size='large'>Выйти</Button>
                        <Button type='dashed' onClick={changePasswordOnClick} danger={true} size='large'>Сменить пароль</Button>
                    </div>
                </div>
            </div>

            {paswordChangeIsActive ? <ChangePasswordWindow switchChangePass={setPaswordChange} paswordChangeIsActive={paswordChangeIsActive} /> : <div />}

        </div>
    )
}

export default AccountInfo