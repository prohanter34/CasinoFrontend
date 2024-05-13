import { Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import Account from "./Account/Account"


const Content = () => {
    return (
        <Routes>
            <Route path="/games/roulette"/>
            <Route path="/account/me" element={<Account />}/>
        </Routes>
    )
}

export default Content