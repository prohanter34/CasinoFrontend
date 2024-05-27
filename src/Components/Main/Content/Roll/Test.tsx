import style from "./Roll.module.css"
import Button from "./Start"

const Test = () => {
    return (
        <div>
            <div className={style.shadow}></div>
	        <div className={style.random}>
                <div className={style.result}></div>
                <div className={style.cards}>
                    <div>Bonus1</div>
                    <div>Bonus2</div>
                    <div>Bonus3</div>
                    <div>Bonus4</div>
                    <div>Bonus5</div>
                    <div>Bonus6</div>
                    <div>Bonus7</div>
                    <div>Bonus8</div>
                    <div>Bonus9</div>
                    <div>Bonus10</div>
                    <div>Bonus11</div>
		        </div>
	        </div>
            <Button ></Button>

        </div>
    )
}
export default Test