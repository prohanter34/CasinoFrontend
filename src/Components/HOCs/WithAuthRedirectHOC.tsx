import { ReactElement } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectResultCode } from "../../store/selectors"


type PropsType = {
    element: ReactElement
}

const WithAuthRedirectHOC = (props: PropsType) => {

    const resultCode = useSelector(selectResultCode)
    if (resultCode === 1000) {
        return (
            props.element
        )
    } else {
        return <Navigate to="/"/>
    }
}

export default WithAuthRedirectHOC