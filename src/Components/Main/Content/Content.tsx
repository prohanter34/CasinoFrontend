import { Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import Account from "./Account/Account"
import Roll from "./Roll/Roll"

const Content = () => {
    return (
        <Routes>
            <Route path="/games/roulette" element={<Roll/>}/>
            <Route path="/account/me" element={<Account/>}/>
        </Routes>
    )
}

export default Content