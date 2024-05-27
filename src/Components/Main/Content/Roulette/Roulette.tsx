import { useDispatch, useSelector } from "react-redux"
import { selectCash, selectRouletteState } from "../../../../store/selectors"
import { Button, Input, Radio, RadioChangeEvent, message } from "antd"
import { ChangeEvent, useEffect, useState } from "react"
import { makeBetThunk, pingRouletteInfo, setResultCode } from "../../../../store/rouletteReducer"



const Roulette = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const rouletteState = useSelector(selectRouletteState)
    const [bet, setBet] = useState(0)
    const [chooseBetType, setBetType]  = useState("green")
    const dispatch = useDispatch<any>()
    const cash = useSelector(selectCash)

    const setBetTypeOnChange = (e: RadioChangeEvent) => {
        setBetType(e.target.value);
    };

    const betInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBet(Number(e.currentTarget.value))
    }

    const makeBetOnClick = () => {
        dispatch(makeBetThunk(bet, chooseBetType, Number(cash)))
    }

    useEffect(() => {
        if (rouletteState.resultCode === 10) {
            messageApi.open({
                type: 'error',
                content: 'Пополните баланс!',
            });
            dispatch(setResultCode(0))
        } else if (rouletteState.resultCode === 1) {
            messageApi.open({
                type: 'error',
                content: 'Дождитесь следующей игры!',
            });
            dispatch(setResultCode(0))
        }
    })

    useEffect(() => {
        dispatch(pingRouletteInfo())
        const interval = setInterval(() =>{
            dispatch(pingRouletteInfo())
        }, 1000 * 1)
        return (() => {clearInterval(interval)})
    }, [])

    return (
        <div>
            {contextHolder}

            <Radio.Group value={chooseBetType} onChange={setBetTypeOnChange}>
                <Radio.Button type="primary" value="red">red</Radio.Button>
                <Radio.Button type="primary" value="green">green</Radio.Button>
                <Radio.Button type="primary" value="black">black</Radio.Button>
            </Radio.Group>

            <Input type="number" pattern="/[0-9]/" value={bet} onChange={betInputOnChange} />

            <Button onClick={makeBetOnClick}>Make bet</Button>
            <div>Result: {rouletteState.lastResult}</div>
            <div>Your bet: {rouletteState.bet}</div>
            <div>Your bet on - {rouletteState.betType}</div>
            <h2>Your cash: {cash}</h2>
            <h2>Current stage: {rouletteState.stage}</h2>
            <h2>Current delta: {rouletteState.delta}</h2>

        </div>
    )
}


export default Roulette