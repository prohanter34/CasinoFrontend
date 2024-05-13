import s from './Account.module.css'
import userPhoto from "../../../../img/user_photo.png"


type PropsType = {
    login: string | null,
    email: string | null,
    cash: number | null,
}

const AccountInfo = (props: PropsType) => {
    return (
        <div className={s.profile}>
            <div className={s.profile_flex}>
                <div className={s.photo}>
                    <img alt="" className={s.photo} src={userPhoto}></img>
                </div>
                <div className={s.info_container}>
                    <div className={s.login}>{props.login}</div>
                    <div className={s.email}>{props.email}</div>
                    <div className={s.cash}>Баланс: {props.cash}</div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo