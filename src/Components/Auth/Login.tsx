import { Alert, Button, Form, Input, Radio } from "antd"
import s from "./Auth.module.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppThunk, loginThunk } from "../../store/authReducer"


type PropsType = {
    resultCode: number
}

const Login = (props: PropsType) => {

    const dispatch = useDispatch<any>()

    const onFinish = (e: FieldType) => {
        dispatch(loginThunk(e.login, e.password))
    }

    const onFinishFailed = () => {

    }

    const [warning, setWarning] = useState("");
    let warningElem
    useEffect(() => {
        if (props.resultCode === 1) {
            setWarning("Такого аккаунта не существует!")
        } else if (props.resultCode === 2) {
            setWarning("Что-то введено неверно!")
        }
    }, [props.resultCode])
    
    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning}/>
    }
    
    return (
        <Form
            className={s.form}
            size="large"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            {warningElem}
            <Form.Item<FieldType>
                className={s.field}
                name="login"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input className={s.input} placeholder="login" />
            </Form.Item>
            <Form.Item<FieldType>
                className={s.field}
                name="password"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input.Password className={s.input} placeholder="password" />
            </Form.Item>
            <Form.Item className={s.submit}>
                <Button type="primary" htmlType="submit" size="large">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login

type FieldType = {
    login: string,
    password: string
}

