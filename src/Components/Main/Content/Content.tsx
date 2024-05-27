import { Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import Account from "./Account/Account"
import Roll from "./Roll/Roll"
import WithAuthRedirectHOC from "../../HOCs/WithAuthRedirectHOC"
import Roulette from "./Roulette/Roulette"


const Content = () => {
    return (
        <Routes>
            <Route path="/games/roulette" element={<Roll/>}/>
            <Route path="/games/roulette" element={<WithAuthRedirectHOC element={<Roulette />} />}/>
            <Route path="/account/me" element={<WithAuthRedirectHOC element={<Account />} />}/>
        </Routes>
    )
}

export default Content