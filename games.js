const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btn = document.querySelector('.btn');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const heart = document.querySelector('.heart')
const time = document.querySelector('.tiempo')
const personal = document.querySelector('.record')
const best = document.querySelector('.best')
const messages = document.querySelector('.poto')
const button = document.createElement('button');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let tapTime;
let record;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
button.addEventListener('click', gamereturn)

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = (window.innerWidth * 0.8).toFixed(0);
  } else {
    canvasSize = (window.innerHeight * 0.8).toFixed(0);
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  playerPosition.x=undefined;
  playerPosition.y=undefined;
  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize.toFixed(3) + 'px Verdana';
  game.textAlign = 'end';
   
  if (localStorage.record) {
    best.innerHTML = localStorage.record;
  }
  
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }
  if (!tapTime) {
    timeStart = Date.now()
    tapTime = setInterval(timeTicking, 100)
  }
  
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log({map, mapRows, mapRowCols});
  
  enemyPositions = [];
  game.clearRect(0,0,canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition});
        }
      } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }
      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function gamereturn() {
  window.location.reload()
  
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;
  
  if (giftCollision) {
    return animationWin();
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });
  
  if (enemyCollision) {
    return animationFailed();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
function animationWin() {
  game.fillStyle = 'rgba(153, 205, 50, 1)'
  game.font = (elementsSize.toFixed(3))*1.2 + 'px Verdana';
  game.fillText(emojis['i'], playerPosition.x , playerPosition.y);
  course()
}
function course() {
  const monkey = setTimeout(() => levelWin(), 200)
}
function levelWin() {
  console.log('Subiste de nivel');
  level++;
  startGame();
}
function levelFail() {
  console.log('Chocaste contra un enemigo :(');
  lives--;
  console.log(lives);



  if (lives == 2) {
    heart.innerHTML = '<p class="red">❤</p> <p class="red">❤</p> <p class="redemption">❤</p>';
  }
  if (lives ==1) {
    heart.innerHTML = '<p class="red">❤</p> <p class="redemption">❤</p> <p class="redemption">❤</p>';
  }
  
  if (lives <= 0) {
    level = 0;
    lives = 3;
    heart.innerHTML = '<p class="red">❤</p> <p class="red">❤</p> <p class="red">❤</p>';
    tapTime=undefined;
  }

  
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function animationFailed() {
  game.font = (elementsSize.toFixed(3))*2 + 'px Verdana';
  game.textAlign = 'end';
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
  game.fillStyle = 'rgba(177, 175, 175, 0.2)'
  game.fillRect(0,0,elementsSize*10,elementsSize*10)
  game.fillStyle = 'rgba(153, 205, 50, 0.9)'
  game.fillText( emojis['N'], elementsSize*6, elementsSize*5.5);
  no()
}
function no() {
  const perrito = setTimeout(() => breaking(), 500)
}

function breaking(){
  if (lives == 1) {
    game.fillText(emojis['P'], playerPosition.x, playerPosition.y);
    fail()
  }
  else{
    game.fillText(emojis['S'], playerPosition.x, playerPosition.y);
    si()
  }
  game.font = (elementsSize.toFixed(3))*2 + 'px Verdana';
  game.textAlign = 'end';
  game.fillStyle = 'rgba(177, 175, 175, 0.2)'
  game.fillRect(0,0,elementsSize*10,elementsSize*10)
  game.fillStyle = 'rgba(153, 205, 50, 0.9)'
  game.fillText( emojis['M'], elementsSize*6, elementsSize*5.5);
  
}
function si() {
  const animalito = setTimeout(() => levelFail(), 700)
}

function fail() {
  const clow = setTimeout(() => levelFail(), 2000)
}

function gameWin() {
  console.log('¡Terminaste el juego!');
  localStorage.setItem('record', Date.now() - timeStart)
  clearInterval(tapTime)
  record=(Date.now() - timeStart);
  if (record < localStorage.record) {
    localStorage.removeItem("record")
    localStorage.setItem('record', record)
    best.innerHTML = "" + record
  }
  personal.innerHTML = "Puntuation:  " + record
  btn.removeChild(btnUp)
  btn.removeChild(btnDown)
  btn.removeChild(btnRight)
  btn.removeChild(btnLeft)
  button.setAttribute('type', 'submit')
    button.innerHTML = "Retry"
    btn.append(button)
}

function timeTicking() {
  time.innerHTML = Date.now() - timeStart;
}
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');

   if ((playerPosition.y - elementsSize) < elementsSize) {
     console.log('OUT');
   } else {
     playerPosition.y -= elementsSize;
     startGame();
   }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  console.log('Me quiero mover hacia derecha');

  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  console.log('Me quiero mover hacia abajo');
  
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}