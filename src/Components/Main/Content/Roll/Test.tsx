import style from "./Roll.module.css"
import Button from "./Start"

const Test = () => {
    return (
        <div>
            Test
            <div className={style.shadow}></div>
	        <div className={style.random}>
                <div className={style.result}></div>
                <div className={style.cards}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
		        </div>
	        </div>
            <Button ></Button>

        </div>
    )
}
export default Test