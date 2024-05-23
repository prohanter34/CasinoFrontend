// var cards_block = document.querySelector('.cards');
// var cards = document.querySelectorAll('.cards > div');
import style from "./Roll.module.css"

const Button = () => {  
  return (    
    <button className={style.start}
      onClick={() => 
        // {

        alert("You clicked on")
        // var random = Math.floor(Math.random() * 9); // От 0 до 8
        // cards_block.style.left = -random * 100 + 'px';

        // setTimeout(function() {
        //     random++;
        //     cards[random].style.background = '#7B90F7';
        //     cards[random].style.color = 'white';
        // }, 5000)}
        }
        style={{
            backgroundColor: "grey",
            border: "none",
            borderRadius: "5%",
            height: "50px",
            width: "200px"

    }}>
    </button>
  );
}

export default Button