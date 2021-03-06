const canv= document.querySelector('canvas');

const ctx=canv.getContext('2d');

canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;

const ballSize = 20;
let ballX=cw/2 - ballSize/2;
let ballY=ch/2 - ballSize/2;

const paddleHeight = 100;
const paddleWidth = 20;

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
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);    
}

function ai(){
    ctx.fillStyle="yellow";
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);    
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
    playerY = e.clientY - topCanvas - paddleHeight/2;

    if(playerY >= ch - paddleHeight){
        playerY = ch - paddleHeight
    }

    if(playerY <= 0){
        playerY = 0;
    }

    // aiY = playerY;
}

function speedUp(){

    if(ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX += .2;
    }else if(ballSpeedX < 0 && ballSpeedX > -16){
        ballSpeedX -= .2;
    }

    if(ballSpeedY > 0 && ballSpeedY < 16){
        ballSpeedY += .2;
    }else if(ballSpeedY < 0 && ballSpeedY > -16){
        ballSpeedY -= .2;
    }
}
 
function aiPosition(){ 
    const middlePaddle = aiY + paddleHeight/2;
    const middleBall = ballY + ballSize/2;
    if(ballX > 500){
        if(middlePaddle - middleBall > 200){
            aiY -= 15;
        }else if(middlePaddle - middleBall > 50){
            aiY -= 5;
        }
        
        if(middlePaddle - middleBall < -200){
            aiY += 15;
        }else if(middlePaddle - middleBall < -50){
            aiY += 5;
        }
    }else if(ballX <= 500 && ballX > 150){
        if(middlePaddle - middleBall > 100){
            aiY -= 3;
        }else if(middlePaddle - middleBall < -100){
            aiY += 3;
        }
    }
}

canv.addEventListener("mousemove", playerPosition)

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
}
setInterval(game, 1000/ 60);