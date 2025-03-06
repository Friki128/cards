import cardsList from '../json/cards.json'
import base from '../img/base.webp'
const images = {
    redredredred: require('../img/red-red-red-red.webp'),
    blueredredred: require('../img/blue-red-red-red.webp'),
    redblueredred: require('../img/red-blue-red-red.webp'),
    redredbluered: require('../img/red-red-blue-red.webp'),
    redredredblue: require('../img/red-red-red-blue.webp'),
    blueblueblueblue: require('../img/blue-blue-blue-blue.webp'),
    redblueblueblue: require('../img/red-blue-blue-blue.webp'),
    blueredblueblue: require('../img/blue-red-blue-blue.webp'),
    blueblueredblue: require('../img/blue-blue-red-blue.webp'),
    bluebluebluered: require('../img/blue-blue-blue-red.webp'),
    redredblueblue: require('../img/red-red-blue-blue.webp'),
    redblueredblue: require('../img/red-blue-red-blue.webp'),
    redbluebluered: require('../img/red-blue-blue-red.webp'),
    blueredredblue: require('../img/blue-red-red-blue.webp'),
    blueredbluered: require('../img/blue-red-blue-red.webp'),
    blueblueredred: require('../img/blue-blue-red-red.webp')
}

const handPositions = document.querySelectorAll(".hand");
const startgameButton = document.querySelector(".start_button");
const boardTiles = document.querySelectorAll(".board .row .tile");
let selected = 0;

function handleHand(element){
    handPositions[selected].classList.remove("selected");
    selected = parseInt(element.id);
    element.classList.add("selected");
}

handPositions.forEach(element => {
    element.addEventListener("click", function(){
       handleHand(this)
    })
    
element.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleHand(this);
    }
});

});

function handleBoard(element){
    let x = parseInt(element.getAttribute("x"))
    let y = parseInt(element.getAttribute("y"));
    if(validatePlacing(x, y)){
        const img = document.createElement('img');
        img.src =  images[hand[selected].Name.replace(/-/g, "")]
        img.ariaLabel = hand[selected].Name
        element.innerHTML = ""
        element.appendChild(img);
        board[y][x] = hand[selected];
        draw(selected);
    if(checkWin()){
        alert("You win!!!");
    }
}
}

boardTiles.forEach(element => {
    element.addEventListener("click", function(){
        handleBoard(this)
    })

    element.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            handleBoard(this);
        }
    });
});
let cards = cardsList.cards;
let board;
let hand;

startgameButton.onclick = function() {
    startGame();
}

function validatePlacing(x, y){
    if(board[y][x] != null)return false;
    if(compatibleTile(x, y - 1, "up", "down")) return false;
    if(compatibleTile(x, y + 1, "down", "up")) return false;
    if(compatibleTile(x + 1, y, "right", "left")) return false;
    if(compatibleTile(x - 1, y, "left", "right")) return false;
    return true;
}

function compatibleTile(x, y, Attributehand, Attributeboard){
    console.log(y);
    if((x<0 || x>3) || (y < 0 || y > 2)) return false;
    if(board[y][x] == null) return false;
    if(board[y][x][Attributeboard] == hand[selected][Attributehand]) return false;
    return true;
}

function checkWin(){
    for(let i=0; i<board.length; i++){
        for(let e=0; e<board[0].length; e++){
            if(board[i][e] === null) return false;
        }
    }
    return true;
}
function startGame(){
    board = [[null, null, null, null], [null, null, null, null], [null, null, null, null]];
    hand = [null, null, null];
    boardTiles.forEach(element => {
        element.innerHTML = "<img src=\""+ base +"\" alt=\"empty\" aria-label=\"empty\">";
    });
    draw(0);
    draw(1);
    draw(2);
}

function draw(id){
    let value = getRandomCardValue();
    hand[id] = cards[value];
    const img = document.createElement('img');
    img.src = images[hand[id].Name.replace(/-/g, "")]
    img.ariaLabel = hand[id].Name
    handPositions[id].innerHTML = "";
    handPositions[id].appendChild(img);
    handPositions[id].tabIndex = "0"
}

function getRandomCardValue(){
    let value = Math.round(Math.random() * 15);
    return value;
}


