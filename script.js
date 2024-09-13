// let btn = document.querySelector("button");
// let inp = document.querySelector("input");
// let ul = document.querySelector("ul");

// btn.addEventListener("click", function(event) {
  // console.log(inp.value);
//   let item = document.createElement("li");
//   item.innerText = inp.value;
  
//   let delBtn = document.createElement("button");
//   delBtn.innerText = "delete";
//   delBtn.classList.add("delete");
  
//   item.appendChild(delBtn);
//   ul.appendChild(item);
//   inp.value = "";
// });

// let delBtns = document.querySelectorAll(".delete");
// for(let delBtn of delBtns) {
//   delBtn.addEventListener("click", function() {
//     let par = this.parentElement;
//     par.remove();
//   })
// }

// ul.addEventListener("click", function(event) {
//   if(event.target.nodeName == "BUTTON") {
//     let listItem = event.target.parentElement;
//      listItem.remove();
//      console.log("deleted!")
//   }
// });

// Simon Game
let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["red", "green", "blue", "yellow"];
document.addEventListener("keypress", function() {
  if(started == false) {
    console.log("Game Started...");
    started=true;
    levelUp();
  }
});

function gameFlash(btn) {
   btn.classList.add("flash");
   setTimeout(function() {
    btn.classList.remove("flash");
   }, 500);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function() {
   btn.classList.remove("userFlash");
  }, 250);
}
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let btnIdx =  Math.floor(Math.random() * 3);
  let randomColor = btns[btnIdx];
 let randBtn = document.querySelector(`.${randomColor}`);
gameSeq.push(randomColor);
console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if(userSeq[idx] === gameSeq[idx]) {
    if(userSeq.length === gameSeq.length) {
      setTimeout(levelUp(), 1000);
    }
  }else {
    h2.innerHTML = `Game over! <b>Your score was ${level}<b>.<br/> press any key start the game`;
    
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);

    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id")
  // console.log(userColor);
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}