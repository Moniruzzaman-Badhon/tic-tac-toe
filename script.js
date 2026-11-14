console.log("Welcome to Tic Tac Toe");

//Sounds
const music = new Audio("music.mp3");
const clickSound = new Audio("clickSound.mp3");
const winSound = new Audio("winSound.mp3");
const drawSound = new Audio("gameDrow.mp3");

music.loop = true;
music.volume = 0.3;

// Browser autoplay fix
document.addEventListener("click", () => {
    music.play().catch(() => {});
}, { once: true });



let turn = "X";
let gameOver = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Winner Check
const checkWin = () => {

    let boxtexts = document.getElementsByClassName("boxtext");

    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    wins.forEach(e => {

        if(
            boxtexts[e[0]].innerText !== "" &&
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[1]].innerText === boxtexts[e[2]].innerText
        ){

            gameOver = true;

            music.pause();

            winSound.currentTime = 0;
            winSound.play();

            document.querySelector(".info").innerText =
            boxtexts[e[0]].innerText + " Won 🎉";

            document.querySelector(".imgbox img").style.display = "block";
        }

    });

};


// Draw Check
const checkDraw = () => {

    let boxtexts = document.getElementsByClassName("boxtext");

    let filled = true;

    Array.from(boxtexts).forEach(box => {

        if(box.innerText === ""){
            filled = false;
        }

    });

    if(filled && !gameOver){

        gameOver = true;

        music.pause();

        drawSound.currentTime = 0;
        drawSound.play();

        document.querySelector(".info").innerText =
        "Match Draw 🤝";

    }

};


// Game Logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {

    let boxtext = element.querySelector(".boxtext");

    element.addEventListener("click", () => {

        if(boxtext.innerText === "" && !gameOver){

            clickSound.currentTime = 0;
            clickSound.play();

            boxtext.innerText = turn;

            checkWin();

            checkDraw();

            if(!gameOver){

                turn = changeTurn();

                document.querySelector(".info").innerText =
                "Turn for " + turn;

            }

        }

    });

});


// Reset Button
document.getElementById("reset").addEventListener("click", () => {

    let boxtexts = document.querySelectorAll(".boxtext");

    boxtexts.forEach(box => {
        box.innerText = "";
    });

    turn = "X";
    gameOver = false;

    document.querySelector(".info").innerText = "Turn for X";

    document.querySelector(".imgbox img").style.display = "none";

    music.currentTime = 0;
    music.play();

});
