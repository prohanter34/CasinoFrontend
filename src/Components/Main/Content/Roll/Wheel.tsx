import style from "./Roll.module.css"

const Wheel = () => {
    return (
        <div>
            <div className={style.wheel}>
                <div className={style.dot}></div>
                <div className={style.arr}></div>
            </div>
        </div>
    )
}
export default Wheel