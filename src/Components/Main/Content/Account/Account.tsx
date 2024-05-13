import { useSelector } from "react-redux"
import s from "./Account.module.css"
import { selectAuthMe } from "../../../../store/selectors"
import AccountInfo from "./AccountInfo"
import BetHistory from "./BetHistory"

const Account = () => {

    const state = useSelector(selectAuthMe)


    return (
        <div className={s.container}>
            <div className={s.grid}>
                <AccountInfo login={state.login} email={state.email} cash={state.cash}/>
                <BetHistory />
                <div className={s.email_warning}>promo</div>
                {/* <div className={s.stats}>promo</div> */}
                <div className={s.dd}>promo</div>
            </div>
        </div>
    )
}

export default Account