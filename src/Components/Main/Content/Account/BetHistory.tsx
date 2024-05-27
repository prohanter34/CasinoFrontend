import { DollarOutlined } from "@ant-design/icons"
import s from "./Account.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectBetHistoryState } from "../../../../store/selectors"
import { ReactNode, useEffect } from "react"
import { getBetHistoriThunk } from "../../../../store/betHistoryReducer"

const BetHistory = () => {

    const state = useSelector(selectBetHistoryState)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(getBetHistoriThunk())
    }, [])


    const gameColumnElems: Array<ReactNode> = []
    const betColumnElems: Array<ReactNode> = []
    const resultColumnElems: Array<ReactNode> = []
    const gainColumnElems: Array<ReactNode> = []

    state.bets.forEach((e, index) => {
        // if (e.game === "roulette") {
        gameColumnElems.push(<DollarOutlined key={index} />)
        // }
        if (e.gain > 0) {
            resultColumnElems.push(<div key={index} className={s.win}>win</div>)
        } else {
            resultColumnElems.push(<div key={index} className={s.lose}>lose</div>)
        }
        betColumnElems.push(<div key={index}>{e.bet}</div>)
        gainColumnElems.push(<div key={index}>{e.gain}</div>)
    })

    return (
        <div className={s.history}>
            <div className={s.history_container}>
                <div className={s.bet_container}>
                    <div>Game</div>
                    {gameColumnElems}
                </div>
                <div className={s.bet_container}>
                    <div>Bet</div>
                    {betColumnElems}
                </div>
                <div className={s.bet_container}>
                    <div>Result</div>
                    {resultColumnElems}
                </div>
                <div className={s.bet_container}>
                    <div>Gain</div>
                    {gainColumnElems}
                </div>
                
            </div>
        </div>
    )
}

export default BetHistory