import Layout from "antd/es/layout/layout"
import s from './Header.module.css'
import { useSelector } from "react-redux"
import { selectLogin, selectResultCode } from "../../../store/selectors"
import { Button, Flex } from "antd"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { UserOutlined } from "@ant-design/icons"

const Header = () => {

    const login = useSelector(selectLogin)
    const resultCode = useSelector(selectResultCode)
    const navigate = useNavigate()

    const acountOnClick = () => {
        navigate("/account/me")
    }

    let elems;

    if (resultCode !== 1000) {
        elems = (
            <Flex gap="middle" className={s.right_flex}>
                <Button style={{fontWeight: 500}} shape="round" type="primary"><Link to='/auth/login'>login</Link></Button>
                <Button style={{fontWeight: 500}} shape="round"><Link to='/auth/registration'>Register</Link></Button>
            </Flex>
        )
    } else {
        elems = (
            <Flex gap="middle"  className={s.right_flex}>
                <div className={s.login}>{login}</div>
                <Button className={s.profile_button}
                 onClick={acountOnClick} 
                 type="dashed" size="middle" 
                 shape="circle">
                    <UserOutlined />
                </Button>
            </Flex >
        )
    }

    return (
        <div className={s.container}>
            <h2 className={s.logo}>SCAM CASINO</h2>
            {elems}
        </div>
    )
}

export default Header