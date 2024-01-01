
const field = document.querySelector('.field');
const spaceShip = document.querySelector('.spaceShip');


const loopTime = 1000 / 24;

// ship =======================================
const shipScale = 5;
const shipFrames = 3;
let ship = {
                top: field.offsetHeight - 18 * shipScale,
                left: (field.offsetWidth / 2) - (13 * shipScale) / 2,
                maxSpeed: 15,
                speedUp: 1,
                slowDown: 0.5,
                height: 18 * shipScale,
                width: 13 * shipScale
            }

// fire
const fireHeight = 26 * shipScale;
const fireWidth = 13 * shipScale;
const fireStartFrames = 4;
let startFireFrame = fireStartFrames;

// blow up
const blowUpHeight = 26 * shipScale;
const blowUpWidth = 13 * shipScale;
const blowUpTop = 6 * shipScale;
const blowUpStartFrames = 3;
let startBlowUpFrame = blowUpStartFrames;

// blow left
const blowLeftHeight = 18 * shipScale;
const blowLeftWidth = 19 * shipScale;
const blowLeftStartFrame = 3;
let startLeftBlowFrame = blowLeftStartFrame;

// blow right
const blowRightHeight = 18 * shipScale;
const blowRightWidth = 19 * shipScale;
const blowRightStartFrame = 3;
const blowRightLeft = 6 * shipScale;
let startRightBlowFrame = blowRightStartFrame;

// explosions =============================
const explosionList = [];
const explosionScale = 4;
const explosionSize = 17 * explosionScale;
const explosionFrames = 13;

const shot = {
        height: 20,
        width: 4,
        speed: 20
}

// shot effect ===================================
let shotEffectList = [];
const shotEffectSizeScale = 3;
const shotEffectSize = 9 * shotEffectSizeScale;
const shotEffectFrames = 8;


let shotList = [];

let keyPress = {
    up:false,
    down:false,
    left:false,
    right:false
}

let directions = {
    up:0,
    down:0,
    left:0,
    right:0
}

// enemy =========================

const enemySize = 40;

const width404 = 23;

let enemyStart = {
    top: 40,
    left: (field.offsetWidth / 2) - ((width404 * enemySize) / 2)
}


let enemyList = [

    // 4
    {top: 0, left: 5},
    {top: 1, left: 4},
    {top: 1, left: 5},
    {top: 2, left: 3},
    {top: 2, left: 5},
    {top: 3, left: 2},
    {top: 3, left: 5},
    {top: 4, left: 1},
    {top: 4, left: 5},
    {top: 5, left: 0},
    {top: 5, left: 5},
    {top: 6, left: 0},
    {top: 6, left: 0},
    {top: 6, left: 1},
    {top: 6, left: 2},
    {top: 6, left: 3},
    {top: 6, left: 4},
    {top: 6, left: 5},
    {top: 6, left: 6},
    {top: 7, left: 5},
    {top: 8, left: 5},
    {top: 9, left: 5},
    {top: 10, left: 5},

    // 0
    {top: 0, left: 10},
    {top: 0, left: 11},
    {top: 0, left: 12},
    {top: 1, left: 9},
    {top: 1, left: 13},
    {top: 2, left: 8},
    {top: 2, left: 13},
    {top: 2, left: 14},
    {top: 3, left: 8},
    {top: 3, left: 12},
    {top: 3, left: 14},
    {top: 4, left: 8},
    {top: 4, left: 11},
    {top: 4, left: 14},
    {top: 5, left: 8},
    {top: 5, left: 11},
    {top: 5, left: 14},
    {top: 6, left: 8},
    {top: 6, left: 11},
    {top: 6, left: 14},
    {top: 7, left: 8},
    {top: 7, left: 10},
    {top: 7, left: 14},
    {top: 8, left: 8},
    {top: 8, left: 9},
    {top: 8, left: 14},
    {top: 9, left: 9},
    {top: 9, left: 13},
    {top: 10, left: 10},
    {top: 10, left: 11},
    {top: 10, left: 12},

    // 4

    {top: 0, left: 5+16},
    {top: 1, left: 4+16},
    {top: 1, left: 5+16},
    {top: 2, left: 3+16},
    {top: 2, left: 5+16},
    {top: 3, left: 2+16},
    {top: 3, left: 5+16},
    {top: 4, left: 1+16},
    {top: 4, left: 5+16},
    {top: 5, left: 0+16},
    {top: 5, left: 5+16},
    {top: 6, left: 0+16},
    {top: 6, left: 0+16},
    {top: 6, left: 1+16},
    {top: 6, left: 2+16},
    {top: 6, left: 3+16},
    {top: 6, left: 4+16},
    {top: 6, left: 5+16},
    {top: 6, left: 6+16},
    {top: 7, left: 5+16},
    {top: 8, left: 5+16},
    {top: 9, left: 5+16},
    {top: 10, left: 5+16}
]


document.addEventListener('keydown', (e) => {
    
    // consoleLog(e.keyCode);
    switch(e.code){
        case 'ArrowUp':
            keyPress.up = true;
            break;
        case 'ArrowDown':
            keyPress.down = true;
            break;
        case 'ArrowLeft':
            keyPress.left = true;
            break;
        case 'ArrowRight':
            keyPress.right = true;
            break;
        case 'Space':
            createShot();
            break;
    }

});

document.addEventListener('keyup', (e) => {
    
    // consoleLog(e.keyCode);
    switch(e.code){
        case 'ArrowUp':
            keyPress.up = false;
            break;
        case 'ArrowDown':
            keyPress.down = false;
            break;
        case 'ArrowLeft':
            keyPress.left = false;
            break;
        case 'ArrowRight':
            keyPress.right = false;
            break;
    }

});


function createShot(){
    let data = {
        top: ship.top - shot.height,
        left: ship.left + (ship.width / 2) - (shot.width / 2),
        show: true
    }
    shotList.push(data);

    createShotEffect(ship.top, ship.left + (ship.width/2));

}

function createExplosion(top,left){

    explosionList.push({
        top:top-explosionSize/2,
        left:left-explosionSize/2,
        frame:explosionFrames
    });
}

function createShotEffect(top,left){

    shotEffectList.push({
        top:top-shotEffectSize/2,
        left:left-shotEffectSize/2,
        frame:shotEffectFrames
    });
}



// ========================= moving ==========================

function goUp(){
    ship.top -= directions.up;
    
    if(ship.top < 0){
        ship.top = 0;
    }
}

function goRight(){
    ship.left += directions.right;
    
    if((ship.left + ship.width) > field.offsetWidth){
        ship.left = field.offsetWidth - ship.width;
    }
}

function goLeft(){
    ship.left -= directions.left;
    
    if(ship.left < 0){
        ship.left = 0;
    }
}

function goDown(){
    ship.top += directions.down;

    if((ship.top + ship.height) > field.offsetHeight){
        ship.top = field.offsetHeight - ship.height;
    }
}

function moveShots(){

    for(let i = 0; i < shotList.length; i ++){
        shotList[i].top -= shot.speed;

        if(shotList[i].top < 0){
            shotList.splice(i,1);
        }
    }

}


function moveShip(){
    // speed up ===============================
    if(keyPress.up === true && directions.up < ship.maxSpeed){
        directions.up += ship.speedUp;
        if(directions.up > ship.maxSpeed){
            directions.up = ship.maxSpeed;
        }
    }

    if(keyPress.down === true && directions.down < ship.maxSpeed){
        directions.down += ship.speedUp;
        if(directions.down > ship.maxSpeed){
            directions.down = ship.maxSpeed;
        }
    }

    if(keyPress.right === true && directions.right < ship.maxSpeed){
        directions.right += ship.speedUp;
        if(directions.right > ship.maxSpeed){
            directions.right = ship.maxSpeed;
        }
    }

    if(keyPress.left === true && directions.left < ship.maxSpeed){
        directions.left += ship.speedUp;
        if(directions.left > ship.maxSpeed){
            directions.left = ship.maxSpeed;
        }
    }

    // slowdown ====================================

    if(keyPress.up === false && directions.up > 0){
        directions.up -= ship.slowDown;
        if(directions.up < 0){
            directions.up = 0;
        }
    }

    if(keyPress.down === false && directions.down > 0){
        directions.down -= ship.slowDown;
        if(directions.down < 0){
            directions.down = 0;
        }
    }

    if(keyPress.right === false && directions.right > 0){
        directions.right -= ship.slowDown;
        if(directions.right < 0){
            directions.right = 0;
        }
    }

    if(keyPress.left === false && directions.left > 0){
        directions.left -= ship.slowDown;
        if(directions.left < 0){
            directions.left = 0;
        }
    }

    
    goUp();
    goDown();
    goLeft();
    goRight();
}


// ==================== check hit ===================

function checkHit(){

    for(let i = 0; i < shotList.length; i ++){
        
        if(shotList[i].show){

            for(let ii = 0; ii < enemyList.length; ii ++) {
    
                if(shotList[i].top >= (enemyList[ii].top * enemySize) + enemyStart.top  && 
                   shotList[i].top <= (enemyList[ii].top * enemySize) + enemyStart.top + enemySize &&
                   shotList[i].left >= (enemyList[ii].left * enemySize) + enemyStart.left &&
                   shotList[i].left <= (enemyList[ii].left * enemySize) + enemyStart.left + enemySize
                ){
                    shotList[i].show = false;
                    createExplosion(((enemyList[ii].top * enemySize) + enemyStart.top)+enemySize/2 , ((enemyList[ii].left * enemySize) + enemyStart.left)+enemySize/2);
                    enemyList.splice(ii,1);
                }
            }
        }
    }
}


// ================== drawing ========================

function drawShip(){

    let frame = 0;

    let div = document.createElement('div');
    div.classList.add('spaceShip');
    

    if(keyPress.left && !keyPress.right){
        frame = 2;
    }
    else if(keyPress.right && !keyPress.left){
        frame = 1;
    }

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${ship.height}px`;
    div.style.width = `${ship.width}px`;
    div.style.backgroundPositionY = `${frame * ship.height}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${ship.width}px ${ship.height * shipFrames}px`

    field.append(div);
}


function drawFireStart(){

    let div = document.createElement('div');
    div.classList.add('fireStart');

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${fireHeight}px`;
    div.style.width = `${fireWidth}px`;
    div.style.backgroundPositionY = `${startFireFrame * fireHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${fireWidth}px ${fireHeight * fireStartFrames}px`

    field.append(div);

    if(startFireFrame > 1){
        startFireFrame--;
    }
}

function drawFireStop(){

    let div = document.createElement('div');
    div.classList.add('fireStart');

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${fireHeight}px`;
    div.style.width = `${fireWidth}px`;
    div.style.backgroundPositionY = `${startFireFrame * fireHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${fireWidth}px ${fireHeight * fireStartFrames}px`

    field.append(div);

    if(startFireFrame < fireStartFrames){
        startFireFrame++;
    }
}

function drawStartBlowUp(){
    
    let div = document.createElement('div');
    div.classList.add('blowUp');

    div.style.top = `${ship.top-blowUpTop}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${blowUpHeight}px`;
    div.style.width = `${blowUpWidth}px`;
    div.style.backgroundPositionY = `${startBlowUpFrame * blowUpHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${blowUpWidth}px ${blowUpHeight * blowUpStartFrames}px`

    field.append(div);

    if(startBlowUpFrame > 1){
        startBlowUpFrame--;
    }
}

function drawStopBlowUp(){
    
    let div = document.createElement('div');
    div.classList.add('blowUp');

    div.style.top = `${ship.top-blowUpTop}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${blowUpHeight}px`;
    div.style.width = `${blowUpWidth}px`;
    div.style.backgroundPositionY = `${startBlowUpFrame * blowUpHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${blowUpWidth}px ${blowUpHeight * blowUpStartFrames}px`

    field.append(div);

    if(startBlowUpFrame < blowUpStartFrames){
        startBlowUpFrame++;
    }
}

function drawStartBlowLeft(){
    
    let div = document.createElement('div');
    div.classList.add('blowLeft');

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${blowLeftHeight}px`;
    div.style.width = `${blowLeftWidth}px`;
    div.style.backgroundPositionY = `${startLeftBlowFrame * blowLeftHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${blowLeftWidth}px ${blowLeftHeight * blowLeftStartFrame}px`

    field.append(div);

    if(startLeftBlowFrame > 1){
        startLeftBlowFrame--;
    }
}

function drawStopBlowLeft(){
    
    let div = document.createElement('div');
    div.classList.add('blowLeft');

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left}px`;
    div.style.height = `${blowLeftHeight}px`;
    div.style.width = `${blowLeftWidth}px`;
    div.style.backgroundPositionY = `${startLeftBlowFrame * blowLeftHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${blowLeftWidth}px ${blowLeftHeight * blowLeftStartFrame}px`

    field.append(div);

    if(startLeftBlowFrame < blowLeftStartFrame){
        startLeftBlowFrame++;
    }
}


function drawStartBlowRight(){
    
    let div = document.createElement('div');
    div.classList.add('blowRight');

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left - blowRightLeft}px`;
    div.style.height = `${blowRightHeight}px`;
    div.style.width = `${blowRightWidth}px`;
    div.style.backgroundPositionY = `${startRightBlowFrame * blowRightHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${blowRightWidth}px ${blowRightHeight * blowRightStartFrame}px`

    field.append(div);

    if(startRightBlowFrame > 1){
        startRightBlowFrame--;
    }
}

function drawStopBlowRight(){
    
    let div = document.createElement('div');
    div.classList.add('blowRight');

    div.style.top = `${ship.top}px`;
    div.style.left = `${ship.left - blowRightLeft}px`;
    div.style.height = `${blowRightHeight}px`;
    div.style.width = `${blowRightWidth}px`;
    div.style.backgroundPositionY = `${startRightBlowFrame * blowRightHeight}px`;
    div.style.backgroundPositionX = '0px';
    div.style.backgroundSize = `${blowRightWidth}px ${blowRightHeight * blowRightStartFrame}px`

    field.append(div);

    if(startRightBlowFrame < blowRightStartFrame){
        startRightBlowFrame++;
    }
}



function drawFire(){

    if(keyPress.up){
        drawFireStart();
    }
    else if(!keyPress.up && startFireFrame < fireStartFrames){
        drawFireStop();
    }

    if(keyPress.down){
        drawStartBlowUp();
    }
    else if(!keyPress.down && startBlowUpFrame < blowUpStartFrames){
        drawStopBlowUp();
    }

    if(keyPress.left){
        drawStartBlowLeft();
    }
    else if(!keyPress.left && startLeftBlowFrame < blowLeftStartFrame){
        drawStopBlowLeft();
    }

    if(keyPress.right){
        drawStartBlowRight();
    }
    else if(!keyPress.right && startRightBlowFrame < blowRightStartFrame){
        drawStopBlowRight();
    }
}



function drawShot(){

    for(let i = 0; i < shotList.length; i ++){

        if(shotList[i].show){
            let div = document.createElement('div');
            div.classList.add('shot');
            div.style.top = `${shotList[i].top}px`;
            div.style.left = `${shotList[i].left}px`;
            div.style.height = `${shot.height}px`;
            div.style.width = `${shot.width}px`;
            field.append(div);
        }
    }

    moveShots();

}

function drawEnemies(){

    for(let i = 0; i < enemyList.length; i ++){

        let div = document.createElement('div');
        div.classList.add('enemyBlock');
        div.style.top = `${(enemyList[i].top * enemySize) + enemyStart.top}px`;
        div.style.left = `${(enemyList[i].left * enemySize) + enemyStart.left}px`;
        div.style.height = `${enemySize}px`;
        div.style.width = `${enemySize}px`;
        field.append(div);
    }

}

function drawExplosions(){
    for(let i = 0; i < explosionList.length; i++){
        
        let p = document.createElement('div');
        p.classList.add('explosion');
        p.style.height = `${explosionSize}px`;
        p.style.width = `${explosionSize}px`;
        p.style.top = `${explosionList[i].top}px`;
        p.style.left = `${explosionList[i].left}px`;
        p.style.backgroundPositionY = `${explosionList[i].frame * explosionSize}px`;
        p.style.backgroundPositionX = '0px';
        p.style.backgroundSize = `${explosionSize}px ${explosionSize*explosionFrames}px`


        field.append(p);
        
        explosionList[i].frame--;

        if(explosionList[i].frame <= 0){
            explosionList.splice(i,1);
        }
    }
}


function drawShotEffect(){
    for(let i = 0; i < shotEffectList.length; i++){
        
        let p = document.createElement('div');
        p.classList.add('shotEffect');
        p.style.height = `${shotEffectSize}px`;
        p.style.width = `${shotEffectSize}px`;
        p.style.top = `${shotEffectList[i].top}px`;
        p.style.left = `${shotEffectList[i].left}px`;
        p.style.backgroundPositionY = `${shotEffectList[i].frame * shotEffectSize}px`;
        p.style.backgroundPositionX = '0px';
        p.style.backgroundSize = `${shotEffectSize}px ${shotEffectSize*shotEffectFrames}px`


        field.append(p);
        
        shotEffectList[i].frame--;

        if(shotEffectList[i].frame <= 0){
            shotEffectList.splice(i,1);
        }
    }
}


function clearScreen(){
    field.innerHTML = '';
}

function drawScreen(){
    clearScreen();
	
    checkHit();
    
    drawShot();
    drawEnemies();
    drawExplosions();
    drawShip();
    drawFire();
    drawShotEffect();
}



// ==================== main function ==========================

function main(){

        moveShip();
    

        drawScreen();

}



// ================================ loop interval =======================

let mainLoopInterval = setInterval(()=>{
                main();
            }, loopTime);








