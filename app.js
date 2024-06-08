let gameSq = [];
let userSq = [];

let btns = ["red","green","yellow","purple"];
let started = false;
let level = 0;
let highScore=0;

let h2=document.querySelector('h2');
let hScore=document.querySelector(".highScore");

document.addEventListener('keypress', ()=>{
    if(started==false){
        started=true;

        let allBtns=document.querySelectorAll(`.btn`);
        for(btn of allBtns){
            btn.addEventListener("click", btnPress);
        }

        levelUp();
    }
    
});

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(()=>{
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash");
    }, 250);
}


function levelUp(){
    userSq=[];
    level++;
    h2.innerText= `Level ${level}`;

    let rndmIdx= Math.floor(Math.random()*4);
    let rndmClr=btns[rndmIdx];
    let rndmBtn=document.querySelector(`.${rndmClr}`)
    gameFlash(rndmBtn);
    gameSq.push(rndmClr);
    console.log(gameSq);
}

function checkAns(idx){
    // let idx = level-1;

    if(userSq[idx]===gameSq[idx]){
        if(userSq.length==gameSq.length){
            setTimeout(levelUp, 1000)
        }
    }else{
        h2.innerHTML=`Game Over! Your scre was <b>${level}</b> <br> Press any key to start!`;
        if(level>highScore){
            highScore=level;
            hScore.innerHTML=`New Highest score : ${highScore} <br>Congratulations!!  You have breaked the record!  `;
        }else{
            hScore.innerHTML=`Highest score : ${highScore}<br> Can you beat this score!!`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }
}

function btnPress(){
    let btn =this;
    userFlash(btn);

    let userClr=btn.getAttribute("id");
    userSq.push(userClr);

    checkAns(userSq.length-1);
}

function reset(){
    started=false;
    gameSq=[];
    userSq=[];
    level=0;
}


