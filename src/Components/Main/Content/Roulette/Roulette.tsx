import { useDispatch, useSelector } from "react-redux"
import { selectRouletteState } from "../../../../store/selectors"
import { Button, Input, Radio, RadioChangeEvent } from "antd"
import { ChangeEvent, useEffect, useState } from "react"
import { makeBetThunk, pingRouletteInfo } from "../../../../store/rouletteReducer"



const Roulette = () => {

    const rouletteState = useSelector(selectRouletteState)
    const [bet, setBet] = useState(0)
    const [chooseBetType, setBetType]  = useState("green")
    const dispatch = useDispatch<any>()

    const setBetTypeOnChange = (e: RadioChangeEvent) => {
        setBetType(e.target.value);
    };

    const betInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBet(Number(e.currentTarget.value))
    }

    const makeBetOnClick = () => {
        dispatch(makeBetThunk(bet, chooseBetType))
    }

    useEffect(() => {
        dispatch(pingRouletteInfo())
        const interval = setInterval(() =>{
            dispatch(pingRouletteInfo())
        }, 1000 * 1)
        return (() => {clearInterval(interval)})
    }, [])

    return (
        <div>
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
            <h2>Current stage: {rouletteState.stage}</h2>
            <h2>Current delta: {rouletteState.delta}</h2>

        </div>
    )
}


export default Roulette