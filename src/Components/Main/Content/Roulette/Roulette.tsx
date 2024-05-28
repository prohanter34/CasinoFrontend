import { useDispatch, useSelector } from "react-redux"
import { selectCash, selectRouletteState } from "../../../../store/selectors"
import { Button, Input, Radio, RadioChangeEvent, message } from "antd"
import { ChangeEvent, useEffect, useState } from "react"
import { makeBetThunk, pingRouletteInfo, setResultCode } from "../../../../store/rouletteReducer"
import Roll from "../Roll/Roll"
import style from "./Roulette.module.css"
import TestRoll from "./TestRoll"

const Roulette = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const rouletteState = useSelector(selectRouletteState)
    const [bet, setBet] = useState(0)
    const [chooseBetType, setBetType]  = useState("green")
    const dispatch = useDispatch<any>()
    const cash = useSelector(selectCash)

    let NumToDegrees = {
        0:360,
        32:9.462,
        15:18.936,
        19:28.41,
        4:37.884,
        21:47.358,
        2:56.832,
        25:66.306,
        17:75.78,
        34:85.254,
        37:94.728,
        6:104.202,
        27:113.676,
        13:123.15,
        36:132.624,
        11:142.098,
        30:151.572,
        8:161.046,
        23:170.52,
        10:179.994,
        5:189.468,
        24:198.942,
        16:208.416,
        33:217.89,
        1:227.364,
        20:236.838,
        14:246.312,
        31:255.786,
        9:265.26,
        22:274.734,
        18:284.208,
        29:293.682,
        7:303.156,
        28:312.63,
        12:322.104,
        35:331.578,
        3:341.052,
        26:350.526
    }

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
            <div className={style.background}>
                <div className={style.elem}>
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
                </div>
            </div>
            <h2>Current stage: {rouletteState.stage}</h2>
            <h2>Current delta: {rouletteState.delta}</h2>
            <Input type="number" pattern="/[0-9]/" />
            <Button type='default'  size='large'>Крутить</Button>
            <TestRoll/>
            <Roll/> 
        </div>
    )
}


export default Roulette