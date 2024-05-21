import { Button, Input } from "antd"
import s from "../Account/Account.module.css"
import { useDispatch } from "react-redux"
import { depositThunk } from "../../../../store/authReducer"
import { ChangeEvent, useState } from "react"


const Deposit = () => {

    const [deposit, setDeposit] = useState("")
    const dispatch = useDispatch<any>()
    const depositOnClick = () => {
        dispatch(depositThunk(Number(deposit)))
    }

    const depositOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDeposit(e.currentTarget.value)
    }

    return (
        <div>
            <div>Пополнить баланс:</div>
            <div className={s.deposit_container}>
                <Input type="text" placeholder="ПРОМОКОД" />
                <Button size="large" type="default">Проверить</Button>
                {/* <Input type="text" placeholder="СУММА" />
                <Button size="large" type="primary">Пополнить</Button> */}
            </div>
            <div className={s.deposit_container}>
                <Input value={deposit} onChange={depositOnChange} type="text" placeholder="СУММА" />
                <Button onClick={depositOnClick} size="large" type="primary">Пополнить</Button>
            </div>
        </div>
    )
}

export default Deposit