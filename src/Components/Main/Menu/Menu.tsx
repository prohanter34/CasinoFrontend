import Sider from "antd/es/layout/Sider"
import s from "./Menu.module.css"
import React from "react";
import { DollarOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";








const MyMenu = () => {
  
  const navigate = useNavigate()

  const profileOnClick = () => {
    navigate('/account/me')
  }

  const rouletteOnClick = () => {
    navigate("/games/roulette")
  }

  const depositOnClick = () => {
    navigate("/account/deposit")
  }

  const items: MenuProps['items'] = [
    {
      key: "main_1",
      icon: <UserOutlined />,
      label: "Account",
      children: [{ key: "main_1_1", label: "Profile", onClick: profileOnClick }, { key: "main_1_2", label: "Deposit", onClick: depositOnClick }]
    }, {
      key: "main_2",
      icon: <DollarOutlined />,
      label: "Games",
      children: [
        { key: "main_2_1", label: "Roulette", onClick: rouletteOnClick }, { key: "main_2_2", label: "Poker" }
      ]
    }
  ]



  return (
    <Sider width={200} style={{zIndex: 2}}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={items} />
    </Sider>
    // <div>menu</div>
  )
}

export default MyMenu