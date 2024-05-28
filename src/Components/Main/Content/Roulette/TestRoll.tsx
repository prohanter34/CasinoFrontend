import s from "./Roulette.module.css"
import Image from "../../../../img/wheel.png";
import Image2 from "../../../../img/image.png";

const TestRoll = () => {

  return (
    <div className={s.container}>
      <img className={s.wheel} src={Image2} alt="imgfile"></img>
    </div>
  )
};

export default TestRoll;