// fxn to generate a random no.
// fxn to generate ques.   --> random no. assign question type assign and question will be decided in bg by switch statement
// fxn to show ques
// fxn to check ans.
sessionStorage.clear();
const scoreEl= document.getElementById("score");
const questionEl = document.getElementById("questionEl");
const formEl = document.getElementById("formEl");
const btn= document.getElementById("btn")
var snackbar = document.getElementById("snackbar");
let score= sessionStorage.getItem("score")
let actualAnswer;



function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateQues = () => {
  const randomNo1 = getRandom(1, 10);
  const randomNo2 = getRandom(1, 10);
  const questionType = getRandom(1, 4);

  let firstNumber, secondNumber, question;

  // to change no. for divide and substract case
  if (randomNo1 > randomNo2 && questionType > 2) {
    firstNumber = randomNo1;
    secondNumber = randomNo2;
  } else {
    firstNumber = randomNo2;
    secondNumber = randomNo1;
  }

  switch (questionType) {
    case 1:
      question = `Q. What is ${firstNumber} multiply by ${secondNumber} ?`;
      actualAnswer = firstNumber * secondNumber;
      break;
    case 2:
      question = `Q. What is ${firstNumber} Add to ${secondNumber} ?`;
      actualAnswer = firstNumber + secondNumber;
      break;
    case 3:
      question = `Q. What is ${firstNumber} Divided By ${secondNumber} ?`;
      actualAnswer = firstNumber / secondNumber;
      actualAnswer= Math.floor(actualAnswer*100)/100;
      break;
    case 4:
      question = `Q. What is ${firstNumber} Subtract from ${secondNumber} ?`;
      actualAnswer = firstNumber - secondNumber;
      break;
    default:
      console.log("default case run");
      break;
  }
 console.log(actualAnswer);
  return {question};
};

const showQues= ()=>{
 const {question}= generateQues();
 questionEl.innerText= question;
};
showQues();

const checkAnswer = (event) =>{
    event.preventDefault();

    const formData = new FormData(formEl);
    const userAnswer = +formData.get("answerInput");
    console.log(userAnswer);
    if (userAnswer === actualAnswer) 
    {score += 1;
      snackbar.innerText="you got right score +1";
      snackbar.className = "show";
      snackbar.style.backgroundColor = "green";
      setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 1000);
    }
     else
    { score -= 1;
      snackbar.innerText="you are wrong score -1";
      snackbar.className = "show";
      snackbar.style.backgroundColor = "red";
      setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 1000);
    }
    showQues();
    sessionStorage.setItem("score",score);
    event.target.reset();
    scoreEl.innerText = score;
}
