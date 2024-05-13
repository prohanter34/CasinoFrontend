import { DollarOutlined } from "@ant-design/icons"
import s from "./Account.module.css"

const BetHistory = () => {
    return (
        <div className={s.history}>
            <div className={s.history_container}>
                <div className={s.bet_container}>
                    <div>Game</div>
                    <div>Bet</div>
                    <div>Result</div>
                    <div>Gain</div>
                </div>
                <div className={s.bet_container}>
                    <DollarOutlined />
                    <div>100$</div>
                    <div className={s.win}>win</div>
                    <div className={s.win}>+100$</div>
                </div>
                <div className={s.bet_container}>
                    <DollarOutlined />
                    <div>150$</div>
                    <div className={s.lose}>lose</div>
                    <div className={s.lose}>-150$</div>
                </div>
                <div className={s.bet_container}>
                    <DollarOutlined />
                    <div>150$</div>
                    <div className={s.lose}>lose</div>
                    <div className={s.lose}>-150$</div>
                </div>
                <div className={s.bet_container}>
                    <DollarOutlined />
                    <div>150$</div>
                    <div className={s.lose}>lose</div>
                    <div className={s.lose}>-150$</div>

                </div>
                <div className={s.bet_container}>
                    <DollarOutlined />
                    <div>100$</div>
                    <div className={s.win}>win</div>
                    <div className={s.win}>+100$</div>

                </div>
            </div>
        </div>
    )
}

export default BetHistory