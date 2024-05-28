import style from "./Roll.module.css"
import Segments from "./Segments"

const Wheel = () => {
    return (
        <div>
            <div className={style.wheel}>
                <div className={style.dot}></div>
                <div className={style.arrow}></div>
                <div className={style.element}></div>
                <Segments/>
                <div className={style.dot2}></div>
            </div>
        </div>
    )
}
export default Wheel