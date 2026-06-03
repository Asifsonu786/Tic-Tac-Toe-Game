let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turnO = true;//Player O turn
let count = 0;

//All winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

//when user clicked button
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color="#b0413e";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color="green";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count === 9 && !isWinner)
    gameDraw();
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner} `;
  msgContainer.classList.remove("hide");
  boxDisabled();
};

//Game draw function (Homework)
const gameDraw = () => {
  msg.innerText = `Game is draw `;
  msgContainer.classList.remove("hide");
  boxDisabled();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

const boxDisabled = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//function for reset game/new game
const resetGame = () => {
  turnO = true;
  boxEnabled();
  msgContainer.classList.add("hide");
};

const boxEnabled = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
