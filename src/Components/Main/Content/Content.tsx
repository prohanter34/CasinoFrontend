import { Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import Account from "./Account/Account"
import WithAuthRedirectHOC from "../../HOCs/WithAuthRedirectHOC"


const Content = () => {
    return (
        <Routes>
            <Route path="/games/roulette"/>
            <Route path="/account/me" element={<WithAuthRedirectHOC element={<Account />} />}/>
        </Routes>
    )
}

export default Content