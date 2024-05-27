import { Button, Input, message } from "antd"
import s from "../Account/Account.module.css"
import { useDispatch, useSelector } from "react-redux"
import { checkPromocodeThunk, depositThunk, setPromoCodCoefficient } from "../../../../store/authReducer"
import { ChangeEvent, useEffect, useState } from "react"
import { selectPromoState } from "../../../../store/selectors"


const Deposit = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [deposit, setDeposit] = useState("")
    const [promocode, setPromocode] = useState("")
    const dispatch = useDispatch<any>()
    const promoState = useSelector(selectPromoState)

    const promoStrimg = promoState.promocodeCoefficient > 1 ? `(промокод +${promoState.promocodeCoefficient*100 - 100}%)` : ""
    useEffect(() => {
        if (promoState.promocodeCoefficient === -1) {
            messageApi.open({
                type: 'error',
                content: 'Такого промокода не существует',
            });
            dispatch(setPromoCodCoefficient(1))
        } else if (promoState.promocodeCoefficient > 1) {
            messageApi.open({
                type: 'success',
                content: 'Промокод введён успешно',
            });
        }
    }, [promoState.promocodeCoefficient])

    const depositOnClick = () => {
        if (Number(deposit) > 0) {
            dispatch(depositThunk(Number(deposit), promoState))
        }
    }

    const checkPromoOnClick = () => {
        if (promocode) {
            dispatch(checkPromocodeThunk(promocode))
        } else {
            messageApi.open({
                type: 'error',
                content: 'Такого промокода не существует',
            });
        }
    }

    const depositOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDeposit(e.currentTarget.value)
    }

    const promocodeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPromocode(e.currentTarget.value)
    }

    return (
        <div>
            {contextHolder}
            <div>Пополнить баланс:</div>
            <div className={s.deposit_container}>
                <Input value={promocode} onChange={promocodeOnChange} type="text" placeholder="ПРОМОКОД" />
                <Button onClick={checkPromoOnClick} size="large" type="default">Применить</Button>
                {/* <Input type="text" placeholder="СУММА" />
                <Button size="large" type="primary">Пополнить</Button> */}
            </div>
            <div className={s.deposit_container}>
                <Input value={deposit} required={true} onChange={depositOnChange} type="number" placeholder="СУММА" />
                <Button onClick={depositOnClick} size="large" type="primary">Пополнить</Button>
            </div>
            <div className={s.depositResult}>Итого: {Math.floor(Number(deposit) * promoState.promocodeCoefficient)} {promoStrimg}</div>
        </div>
    )
}

export default Deposit