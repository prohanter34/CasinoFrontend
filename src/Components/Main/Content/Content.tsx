import { Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import Account from "./Account/Account"
import WithAuthRedirectHOC from "../../HOCs/WithAuthRedirectHOC"
import Roulette from "./Roulette/Roulette"
import TestRoll from "./Roulette/TestRoll"


const Content = () => {
    return (
        <Routes>
            <Route path="/games/roulette" element={<WithAuthRedirectHOC element={<TestRoll />} />}/>
            <Route path="/account/me" element={<WithAuthRedirectHOC element={<Account />} />}/>
        </Routes>
    )
}

export default Content