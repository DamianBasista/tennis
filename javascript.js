const canv= document.querySelector('canvas');

const ctx=canv.getContext('2d');

canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;

const ballSize = 20;
let ballX=cw/2 - ballSize/2;
let ballY=ch/2 - ballSize/2;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 4;
let ballSpeedY = 4;

function player(){
    ctx.fillStyle="#7fff00";
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);    
}

function ai(){
    ctx.fillStyle="yellow";
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);    
}

function ball(){
    ctx.fillStyle="#ffffff";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY = -ballSpeedY
        speedUp();
    }

    if(ballX <= 0 || ballX + ballSize >= cw){
        ballSpeedX = -ballSpeedX
        speedUp();
    }
}

function table(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,cw,ch);

    for(let linePosition = 20; linePosition < ch; linePosition += 30){
        ctx.fillStyle = "gray";
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
    }
}

topCanvas = canv.offsetTop;

function playerPosition(e){
    playerY = e.clientY - topCanvas - paddelHeight/2;

    if(playerY >= ch - paddelHeight){
        playerY = ch - paddelHeight
    }

    if(playerY <= 0){
        playerY = 0;
    }

    aiY = playerY;
}

function speedUp(){

    if(ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX += 1;
    }else if(ballSpeedX < 0 && ballSpeedX > -16){
        ballSpeedX -= 1;
    }

    if(ballSpeedY > 0 && ballSpeedY < 16){
        ballSpeedY += 1;
    }else if(ballSpeedY < 0 && ballSpeedY > -16){
        ballSpeedY -= 1;
    }
}

canv.addEventListener("mousemove", playerPosition)

function game(){
    table();
    ball();
    player();
    ai();
}
setInterval(game, 1000/ 60);