import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import s from "../Account/Account.module.css"
import { Button, Input, message } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { changePasswordThunk, setChangePassResultCode } from "../../../../store/authReducer"
import { passwordValidator } from "../../../Validators/validators"
import { RootState } from "../../../../store/store"

type PropsType = {
    switchChangePass: Dispatch<SetStateAction<boolean>>,
    paswordChangeIsActive: boolean
}

const ChangePasswordWindow = (props: PropsType) => {
    
    const [messageApi, contextHolder] = message.useMessage();
    const [oldPassw, setOldPasw] = useState("")
    const [newPassw, setNewPasw] = useState("")
    const dispatch = useDispatch<any>()

    const resultCode = useSelector((state: RootState) => state.auth.me.changePassResultCode)

    useEffect(() => {
        if (resultCode === 1) {
            props.switchChangePass(false)
            dispatch(setChangePassResultCode(0))
        } else if (resultCode === 2) {
            messageApi.open({
                type: 'error',
                content: 'Старый пароль введён неверно',
            });
        }
    }, [resultCode])

    const closeOnClick = () => {
        props.switchChangePass(!props.paswordChangeIsActive)
    }

    const newPasswOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPasw(e.currentTarget.value)
    }

    const oldPasswOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPasw(e.currentTarget.value)
    }

    const changePasswOnClick = () => {
        if (passwordValidator(newPassw)) {
            if (oldPassw !== newPassw) {
                dispatch(changePasswordThunk(oldPassw, newPassw))
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Новый пароль такой же как и старый',
                });
            }
        } else {
            messageApi.open({
                type: 'error',
                content: 'Новый пароль слишком слабый',
            });
        }
    }


    return (
        <div className={s.password_change_window} >
            {contextHolder}
            <div className={s.password_change_container}>

                <button className={s.close_password_change_button} onClick={closeOnClick}><CloseOutlined /></button>
                <div>Сменить пароль:</div>
                <Input required={true} type="password" value={oldPassw} onChange={oldPasswOnChange} placeholder="СТАРЫЙ ПАРОЛЬ" />
                <Input required={true} pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,100}$/" 
                    type="password" value={newPassw} 
                    onChange={newPasswOnChange} placeholder="НОВЫЙ ПАРОЛЬ" />
                <Button type="primary" onClick={changePasswOnClick} size="large">Подтвердить</Button>
            </div>
        </div>
    )
}

export default ChangePasswordWindow