"use strict"


// colors ==========================
const _BLACK  = '#1d1f21';
const _WHITE  = '#c5c8c6';
const _GREEN  = '#8c9440';
const _RED    = '#a54242';
const _YELLOW = '#f0c674';
const _ORANGE = '#de935f';
const _BLUE   = '#5f819d';
const _LILA   = '#b294bb';



// variables ========================
let gameEnd = false;;
let gamePause = false;
let canvas;
let context;
let bgcontext;
let userControl = true;
let gameLost = false;
let FPS = 0;
let FPSprevTime = 0;
let FPSFrames = 0;

const gameWidth = 600;
const shrinkScreenSpeed = 500;
let shrinkScreenOn = false;

let gameStarted = false;
let errorEnded = false;

let deltaTime = 0;
let oldTimeStamp = 0;

let keyPress = {
    up:false,
    down:false,
    left:false,
    right:false,
    space:false
}

let directions = {
    up:0,
    down:0,
    left:0,
    right:0
}

let shotList = [];
let shotEffectList = [];
let explosionList = [];
let badGuyList = [];
let badGuyShotList = [];
let ammoUpList = [];
let pickUpEffectList = [];
let healthUpList = [];
let fireRateUpList = [];
let finalBossShotList = [];

let errorMsgList = [];
let errorMsgSize = 10;
let errorMsgX = 100;
const errorMsgY = 20;
let errorMsgWidth = 0;
let errorMsgHeight = 0;



// get the images and other stuff ==================== 
const spaceShip = document.querySelector('.spaceShip');
const shotEffect = document.querySelector('.shotEffect');
const fire = document.querySelector('.fire');
const explosion = document.querySelector('.explosion');
const winMsg = document.querySelector('.winMsg');
const background = document.querySelector('.background');
const backgroundHolder = document.querySelector('.backgroundHolder');
const stars = document.querySelector('.stars');
const badGuy = document.querySelector('.badGuy');
const ammoUp = document.querySelector('.ammoUp');
const healthUp = document.querySelector('.healthUp');
const fireRateUp = document.querySelector('.fireRateUp');
const pickUpEffect = document.querySelector('.pickUpEffect');
const endMsg = document.querySelector('.endMsg');
const fpsLable = document.querySelector('.fpsLable');

const healthBar = document.querySelector('.health');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const line4 = document.querySelector('.line4');


const body = document.querySelector('.body');

// audio =====================

const shootSound = new Howl({
    src: ['404assets/audio/shoot.wav']
});

const explosionSound = new Howl({
    src: ['404assets/audio/explosion.wav']
});

const pickUpSound = new Howl({
    src: ['404assets/audio/pickup.wav']
});

const hitSound = new Howl({
    src:['404assets/audio/hit.wav']
});

const loseSound = new Howl({
    src:['404assets/audio/lose.wav']
});

const bm1Sound = new Howl({
    src:['404assets/audio/bm1.mp4'],
    html5: true,
    onend: function() {
        bm1Sound.play();
      }
});

const wonSound = new Howl({
    src:['404assets/audio/game_won.mp4'],
    html5: true
});

// sprites ===========================
const spaceShipScale = 4;
let spaceShipInfo = {
    img:spaceShip,
    sourceImage:{
                width: 91,
                height: 378,
                frameAmount: 3,
                currentFrame: 0
                },
    destImage:{
                width: 13 * spaceShipScale,
                height: 18 * spaceShipScale
            },
    maxSpeed: 300,
    slowDown: 400,
    speedUp: 400,
    x: (body.offsetWidth / 2) - ((13 * spaceShipScale) / 2),
    y: body.offsetHeight - (18 * spaceShipScale),
    show: true,
    health: 100,
    ammo: 200,
    enemyDowned: 0
}

const badGuyScale = 4;
let badGuyInfo = {
    img:badGuy,
    sourceImage:{
                width: 91,
                height: 273,
                frameAmount: 3
                },
    destImage:{
                width: 13 * badGuyScale,
                height: 13 * badGuyScale
            },
    speed: 100,
    shootChance: 0.7,
    moveChangeChanceVertical: 0.8,
    moveChangeChanceHorizontal: 0.5,
    maxMovmentDistance: 100,
    maxAmountOfBadGuys: 5,
    spawnRate: 0.7,
    spawnRateCounter: 0
}

let fireInfo = {
    img:fire,
    sourceImage:{
                width: 91,
                height: 728,
                frameAmount: 4,
                currentFrame: 0
                },
    destImage:{
                width: 13 * spaceShipScale,
                height: 26 * spaceShipScale
                },
    speed: 30,
    frame: 0,
    x: 0,
    y: 0
}

let shotInfo = {
    height: 30,
    width: 4,
    speed: 500,
    rate: 14,
    rateCounter: 0,
    maxRate: 20
}

let badGuyShotInfo = {
    height: 30,
    width: 4,
    speed: 400,
    power: 5
}

const shotEffectScale = 3;
let shotEffectInfo = {
    img: shotEffect,
    sourceImage:{
                width: 63,
                height: 504,
                frameAmount: 8
                },
    destImage:{
                width: 9 * shotEffectScale,
                height: 9 * shotEffectScale
               },
    speed: 40
}

// const explosionScale = 3;
let explosionInfo = {
    img: explosion,
    sourceImage:{
                width: 119,
                height: 1547,
                frameAmount: 13
                },
    destImage:{
                width: 17,
                height: 17
               },
    speed: 50
}

const ammoUpScale = 4;
let ammoUpInfo = {
    img: ammoUp,
    sourceImage:{
                width: 91,
                height: 714,
                frameAmount: 6
                },
    destImage:{
                width: 13 * ammoUpScale,
                height: 17 * ammoUpScale
            },
    turnSpeed: 10,
    speed: 100
}

const healthUpScale = 4;
let healthUpInfo = {
    img: healthUp,
    sourceImage:{
                width: 91,
                height: 1001,
                frameAmount: 11
                },
    destImage:{
                width: 13 * healthUpScale,
                height: 13 * healthUpScale
            },
    turnSpeed: 10,
    speed: 90
}

const fireRateUpScale = 4;
let fireRateUpInfo = {
    img: fireRateUp,
    sourceImage:{
                width: 119,
                height: 1071,
                frameAmount: 9
                },
    destImage:{
                width: 17 * fireRateUpScale,
                height: 17 * fireRateUpScale
            },
    turnSpeed: 10,
    speed: 110
}

const pickUpEffectScale = 8;
let pickUpEffectInfo = {
    img: pickUpEffect,
    sourceImage:{
                width:217,
                height:1736,
                frameAmount:8
                },
    destImage:{
                width: 31 * pickUpEffectScale,
                height: 31 * pickUpEffectScale
            },
    speed: 20
}

let backGroundInfo = {
    img: stars,
    speed: 200,
    destImage:{
        x:0,
        y:0,
        width:0,
        height:0
    },
    canvasHeight:100,
    slideDownTime: 1000
}

const maxEnemyBeforeBoss = 20;

let gameStartMsg = {
    index: 0,
    speed: 1000,
    interval: '',
    array:[
        '3',
        '2',
        '1',
        'down '+maxEnemyBeforeBoss+' enemies',
        'down '+maxEnemyBeforeBoss+' enemies',
        'good luck',
        ''
    ]
}


let finalBossFight = false;
let finalBossDead = false;
let destroyBossInterval = '';
let finalBossReady = false;

let finalBossShotInfo = {
    height: 40,
    width: 10,
    speed: 300,
    power: 10
}

let finalBossList = [];
let finalBossInfo = {
    speed: 100,
    shootChance: 0.8,
    moveChangeChanceVertical: 0.8,
    moveChangeChanceHorizontal: 0.7,
    maxMovmentDistance: 100,
    movmentChange: 0,
    direction:0,
    chanceMoveCounter:0,
    chanceShotCounter:0,
    bitSize: 0,
    width: 0,
    height: 0,
    x:0,
    y:0,
    frame:0,
    damageForWin: 30,
    damage:0,
    amountOfNull: []
}

// set up the key presses ================================

document.addEventListener('mousedown', (e) =>{

    if(userControl){
        if(e.buttons === 1){
            keyPress.space = true;
        }
    }

    // e.preventDefault();

});

document.addEventListener('mouseup', (e) =>{

    //if(e.buttons === 1){
        keyPress.space = false;
    //}
        // e.preventDefault();
});

document.addEventListener('contextmenu', () =>{

    pauseGame();

});

document.addEventListener("visibilitychange", (e)=>{
        
        pauseGame();

        
});

document.addEventListener('keydown', (e) => {
    
    if(userControl){

        // console.log(e.code);
        switch(e.code){
            case 'ArrowUp':
            case 'KeyW':
                keyPress.up = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                keyPress.down = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                keyPress.left = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                keyPress.right = true;
                break;
            case 'Space':
                keyPress.space = true;
                break;
        }
}
});

document.addEventListener('keyup', (e) => {
    
    // console.log(e.code);
    switch(e.code){
        case 'ArrowUp':
        case 'KeyW':
            keyPress.up = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyPress.down = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keyPress.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyPress.right = false;
            break;
        case 'Space':
            keyPress.space = false;
            break;
        case 'KeyP':
            togglePause();
            break;
        case 'Escape':
            togglePause();
            break;
    }

});


// create things ====================================
function createShot(){
    if(spaceShipInfo.ammo > 0){

        // play the shot audio
        shootSound.play();
        
        shotList.push({
            x: spaceShipInfo.x + (spaceShipInfo.destImage.width/2) - (shotInfo.width/2),
            y: spaceShipInfo.y
        });

        createShotEffect(spaceShipInfo.x + (spaceShipInfo.destImage.width/2) - (shotEffectInfo.destImage.width/2),
                             spaceShipInfo.y - (shotEffectInfo.destImage.height/2));
    
        if(gameStarted){
            spaceShipInfo.ammo --;
        }

        writeAmmo(spaceShipInfo.ammo);
    }
}

function createShotEffect(x,y){
    shotEffectList.push({
        x: x,
        y: y,
        frame:0
    });
}

function createExplosion(x,y,scale){

    // play explosion sound
    //explosionSound.play();

    explosionList.push({
        x: x - (explosionInfo.destImage.width * scale / 2),
        y: y - (explosionInfo.destImage.height * scale / 2),
        frame: 0,
        width: explosionInfo.destImage.width * scale,
        height: explosionInfo.destImage.height * scale
    });
}

function createPickUpEffect(x,y){

    // play pickup sound
    pickUpSound.play();

    pickUpEffectList.push({
        x: x - (pickUpEffectInfo.destImage.width / 2),
        y: y - (pickUpEffectInfo.destImage.height / 2),
        frame: 0
    });
}

function createAmmoUp(x,y){
    ammoUpList.push({
        x:x,
        y:y,
        frame:0
    });
}

function createFireRateUp(x,y){
    fireRateUpList.push({
        x:x,
        y:y,
        frame:0
    });
}

function createHealthUp(x,y){
    healthUpList.push({
        x:x,
        y:y,
        frame:0
    });
}

function createBadGuy(x,y){
    badGuyList.push({
        x: x,
        y: y,
        frame:0,
        movmentChange: 0,
        direction:0,
        chanceMoveCounter:0,
        chanceShotCounter:0
    });
}

function createBadGuyShot(x,y){
    badGuyShotList.push({
        x:x,
        y:y
    });
}

function createFinalBossShot(x,y){
    finalBossShotList.push({
        x:x,
        y:y
    });
}

function spawnBadGuy(){

    if(spaceShipInfo.enemyDowned < maxEnemyBeforeBoss){

        if(badGuyList.length < badGuyInfo.maxAmountOfBadGuys){
    
            badGuyInfo.spawnRateCounter++;
    
            if(badGuyInfo.spawnRateCounter > FPS){
                badGuyInfo.spawnRateCounter = 0;
    
                if(Math.random() < badGuyInfo.spawnRate){
                    let minX = 0;
                    let maxX = canvas.width - badGuyInfo.destImage.width;
    
                    let x = Math.round(Math.random() * (maxX-minX) + minX);
    
                    createBadGuy(x,0);
                }
            }
        }
    }
}

function spawnAmmoUp(){
    
    if(ammoUpList.length < 1){
        let minX = 0;
        let maxX = canvas.width - ammoUpInfo.destImage.width;

        let x = Math.round(Math.random() * (maxX-minX) + minX);
        
        createAmmoUp(x,0);
    }
}

function spawnHealthUp(){
    
    if(healthUpList.length < 1){
        let minX = 0;
        let maxX = canvas.width - healthUpInfo.destImage.width;

        let x = Math.round(Math.random() * (maxX-minX) + minX);
        
        createHealthUp(x,0);
    }
}

function spawnFireRateUp(){
    
    if(shotInfo.rate < shotInfo.maxRate){

        if(fireRateUpList.length < 1){
            let minX = 0;
            let maxX = canvas.width - fireRateUpInfo.destImage.width;
    
            let x = Math.round(Math.random() * (maxX-minX) + minX);
            
            createFireRateUp(x,0);
        }
    }
}

function spawnFinalBoss(){
    
    finalBossInfo.y =  0 - (finalBossInfo.height + 10);
    finalBossInfo.x = (canvas.width / 2) - (finalBossInfo.width / 2);
    
    finalBossFight = true;

    finalBossInfo.direction = 2;

}

// checking stuff ===================================

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2){

        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        return true;
}

function checkErrorMsgHit(){

    let shotGone = false;

    for(let i = 0; i < shotList.length; i ++){

        shotGone = false;

        for(let ii = 0; ii < errorMsgList.length; ii ++) {

            if(errorMsgList[ii].show){
                if(rectIntersect(shotList[i].x,
                                 shotList[i].y,
                                 shotInfo.width,
                                 shotInfo.height,
                                 errorMsgList[ii].x,
                                 errorMsgList[ii].y,
                                 errorMsgSize,
                                 errorMsgSize))
                                {

                    explosionSound.play();
                    shotGone = true;
                    createExplosion(errorMsgList[ii].x + errorMsgSize/2 , errorMsgList[ii].y + errorMsgSize/2,3);
                    errorMsgList[ii].show = false;
                    

                }
            }
        }
        
        if(shotGone){
            shotList.splice(i,1);
        }
    }
}

function checkAmmoUpPickUp(){
    for(let i = 0; i < ammoUpList.length; i ++){

        if(rectIntersect(ammoUpList[i].x,
                            ammoUpList[i].y,
                            ammoUpInfo.destImage.width,
                            ammoUpInfo.destImage.height,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
                        {

            createPickUpEffect(ammoUpList[i].x + ammoUpInfo.destImage.width/2 , ammoUpList[i].y + ammoUpInfo.destImage.height/2,3);
            ammoUpList.splice(i,1);
            spaceShipInfo.ammo += 100;
            writeAmmo(spaceShipInfo.ammo);
            
            break;
        }
    }
}

function checkHealthUpPickUp(){
    for(let i = 0; i < healthUpList.length; i ++){

        if(rectIntersect(healthUpList[i].x,
                            healthUpList[i].y,
                            healthUpInfo.destImage.width,
                            healthUpInfo.destImage.height,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
                        {

            createPickUpEffect(healthUpList[i].x + healthUpInfo.destImage.width/2 , healthUpList[i].y + healthUpInfo.destImage.height/2,3);
            healthUpList.splice(i,1);
            spaceShipInfo.health = 100;
            writeHealth(spaceShipInfo.health);

            break;
        }
    }
}

function checkFireRateUpPickUp(){
    for(let i = 0; i < fireRateUpList.length; i ++){

        if(rectIntersect(fireRateUpList[i].x,
                            fireRateUpList[i].y,
                            fireRateUpInfo.destImage.width,
                            fireRateUpInfo.destImage.height,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
                        {

            createPickUpEffect(fireRateUpList[i].x + fireRateUpInfo.destImage.width/2 , fireRateUpList[i].y + fireRateUpInfo.destImage.height/2,3);
            fireRateUpList.splice(i,1);
            shotInfo.rate += 4;

            if(shotInfo.rate > shotInfo.maxRate){
                shotInfo.rate = shotInfo.maxRate;
            }

            writeFireRate(shotInfo.rate);

            break;
        }
    }

}

function checkBadGuyDestroy(){

    if(spaceShipInfo.enemyDowned >= maxEnemyBeforeBoss && badGuyList.length < 1){

        spawnAmmoUp();
        spawnHealthUp();

        setTimeout(()=>{
            spawnFinalBoss();
        }, 3000);
    }

    for(let i = 0; i < shotList.length; i ++){

        for(let ii = 0; ii < badGuyList.length; ii ++) {

            if(rectIntersect(shotList[i].x,
                                shotList[i].y,
                                shotInfo.width,
                                shotInfo.height,
                                badGuyList[ii].x,
                                badGuyList[ii].y,
                                badGuyInfo.destImage.width,
                                badGuyInfo.destImage.height))
                            {

                explosionSound.play();
                createExplosion(badGuyList[ii].x + badGuyInfo.destImage.width/2 , badGuyList[ii].y + badGuyInfo.destImage.height/2,3);
                shotList.splice(i,1);
                badGuyList.splice(ii,1);

                spaceShipInfo.enemyDowned += 1;

                writeEnemyDown(spaceShipInfo.enemyDowned);

                if(spaceShipInfo.enemyDowned % 30 === 0){
                    spawnAmmoUp();
                }

                if(spaceShipInfo.enemyDowned % 50 === 0){
                    spawnHealthUp();
                }

                if(spaceShipInfo.enemyDowned % 25 === 0){
                    spawnFireRateUp();
                }

                break;
            }
        }
    }
}

function checkShipDestroy(){

    for(let i = 0; i < badGuyShotList.length; i ++){

        if(rectIntersect(badGuyShotList[i].x,
                            badGuyShotList[i].y,
                            badGuyShotInfo.width,
                            badGuyShotInfo.height,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
                        {

            hitSound.play();
            createExplosion(badGuyShotList[i].x, badGuyShotList[i].y + badGuyShotInfo.height,1);
            badGuyShotList.splice(i,1);
            spaceShipInfo.health -= badGuyShotInfo.power;
            
            
            if(spaceShipInfo.health < 0){
                spaceShipInfo.health = 0;
                spaceShipDestroyed();
            }

            writeHealth(spaceShipInfo.health);
            break;
        }
    }
}

function checkFinalBossShotHit(){

    for(let i = 0; i < finalBossShotList.length; i ++){

        if(rectIntersect(finalBossShotList[i].x,
                            finalBossShotList[i].y,
                            finalBossShotInfo.width,
                            finalBossShotInfo.height,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
                        {

            hitSound.play();
            createExplosion(finalBossShotList[i].x, finalBossShotList[i].y + finalBossShotInfo.height,3);
            finalBossShotList.splice(i,1);
            spaceShipInfo.health -= finalBossShotInfo.power;
            
            
            if(spaceShipInfo.health < 0){
                spaceShipInfo.health = 0;
                spaceShipDestroyed();
            }

            writeHealth(spaceShipInfo.health);
            break;
        }
    }
}

function checkShipHitBadGuy(){

    for(let i = 0; i < badGuyList.length; i ++){

        if(rectIntersect(badGuyList[i].x,
                            badGuyList[i].y,
                            badGuyInfo.destImage.width,
                            badGuyInfo.destImage.height,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
                        {

            createExplosion(badGuyList[i].x + badGuyInfo.destImage.width/2 , badGuyList[i].y + badGuyInfo.destImage.height/2,3);
            badGuyList.splice(i,1);
            spaceShipDestroyed();
            break;
        }
    }
}

function checkFinalBossHit(){

    let shotGone = false;

    let list = finalBossList[finalBossInfo.frame];

    for(let i = 0; i < shotList.length; i ++){

        shotGone = false;

        for(let ii = 0; ii < list.length; ii ++) {

            if(list[ii].show){
                if(rectIntersect(shotList[i].x,
                                 shotList[i].y,
                                 shotInfo.width,
                                 shotInfo.height,
                                 list[ii].x + finalBossInfo.x,
                                 list[ii].y + finalBossInfo.y,
                                 finalBossInfo.bitSize,
                                 finalBossInfo.bitSize))
                                {
                    
                    explosionSound.play();
                    shotGone = true;
                    createExplosion(list[ii].x + finalBossInfo.x + (finalBossInfo.bitSize/2),
                                    list[ii].y + finalBossInfo.y + (finalBossInfo.bitSize/2),
                                    1);
                    finalBossList[0][ii] = false;
                    finalBossList[1][ii] = false;
                    finalBossList[2][ii] = false;

                    if(finalBossInfo.damage > finalBossInfo.damageForWin){
                        finalBossDestroyed();
                    }
                }
            }
        }
        
        if(shotGone){
            shotList.splice(i,1);
        }
    }
}

function checkShitHitFinalBoss(){

    let list = finalBossList[finalBossInfo.frame];

    for(let i = 0; i < list.length; i++){

        if(list[i].show){
            if(rectIntersect(list[i].x + finalBossInfo.x,
                            list[i].y + finalBossInfo.y,
                            finalBossInfo.bitSize,
                            finalBossInfo.bitSize,
                            spaceShipInfo.x,
                            spaceShipInfo.y,
                            spaceShipInfo.destImage.width,
                            spaceShipInfo.destImage.height))
            {
                spaceShipDestroyed();
                break;
            }
        }
    }
}


// moving stuff =====================================
function moveShots(){

    // fire rate
    if(keyPress.space){

        if(shotInfo.rateCounter === 0){
            createShot();
        }

        shotInfo.rateCounter += shotInfo.rate * deltaTime;

        if(shotInfo.rateCounter > 1){
            shotInfo.rateCounter = 0;
        }
    }

    if(!keyPress.space){
        shotInfo.rateCounter = 0;
    }

    for(let i = 0; i < shotList.length;i++){

        shotList[i].y -= shotInfo.speed * deltaTime;

        if(shotList[i].y < 0){
            shotList.splice(i,1);
        }
    }
}

function moveShotEffect(){
    for(let i = 0; i < shotEffectList.length;i++){

        shotEffectList[i].frame += shotEffectInfo.speed * deltaTime;

        if(Math.floor(shotEffectList[i].frame)>shotEffectInfo.sourceImage.frameAmount){
            shotEffectList.splice(i,1);
        }
    }
}

function moveExplosions(){
    for(let i = 0; i < explosionList.length;i++){

        explosionList[i].frame += explosionInfo.speed * deltaTime;

        if(Math.floor(explosionList[i].frame)>explosionInfo.sourceImage.frameAmount){
            explosionList.splice(i,1);
        }
    }
}

function moveAmmoUp(){
    for(let i = 0; i < ammoUpList.length;i++){

        ammoUpList[i].frame += ammoUpInfo.turnSpeed * deltaTime;

        if(Math.floor(ammoUpList[i].frame)>ammoUpInfo.sourceImage.frameAmount-1){
            ammoUpList[i].frame = 0;
        }

        ammoUpList[i].y += ammoUpInfo.speed * deltaTime;
        
        if(ammoUpList[i].y > canvas.height){
            ammoUpList.splice(i,1);
        }
    }
}

function moveHealthUp(){
    for(let i = 0; i < healthUpList.length;i++){

        healthUpList[i].frame += healthUpInfo.turnSpeed * deltaTime;

        if(Math.floor(healthUpList[i].frame)>healthUpInfo.sourceImage.frameAmount-1){
            healthUpList[i].frame = 0;
        }

        healthUpList[i].y += healthUpInfo.speed * deltaTime;
        
        if(healthUpList[i].y > canvas.height){
            healthUpList.splice(i,1);
        }
    }
}

function moveFireRateUp(){
    for(let i = 0; i < fireRateUpList.length;i++){

        fireRateUpList[i].frame += fireRateUpInfo.turnSpeed * deltaTime;

        if(Math.floor(fireRateUpList[i].frame)>fireRateUpInfo.sourceImage.frameAmount-1){
            fireRateUpList[i].frame = 0;
        }

        fireRateUpList[i].y += fireRateUpInfo.speed * deltaTime;
        
        if(fireRateUpList[i].y > canvas.height){
            fireRateUpList.splice(i,1);
        }
    }
}

function movePickUpEffect(){
    for(let i = 0; i < pickUpEffectList.length;i++){

        pickUpEffectList[i].frame += pickUpEffectInfo.speed * deltaTime;

        if(Math.floor(pickUpEffectList[i].frame)>pickUpEffectInfo.sourceImage.frameAmount){
            pickUpEffectList.splice(i,1);
        }
    }
}

function moveBackground(){

    backGroundInfo.destImage.y += backGroundInfo.speed * deltaTime;

    if(backGroundInfo.destImage.y > backGroundInfo.canvasHeight){
        backGroundInfo.destImage.y = 0;
    }
}

function moveBadGuyShot(){

    for(let i = 0; i < badGuyShotList.length; i++){

        badGuyShotList[i].y += badGuyShotInfo.speed * deltaTime;

        if(badGuyShotList[i].y > canvas.height){
            badGuyShotList.splice(i,1);
        }
    }
}

function moveFinalBossShot(){

    for(let i = 0; i < finalBossShotList.length; i++){

        finalBossShotList[i].y += finalBossShotInfo.speed * deltaTime;

        if(finalBossShotList[i].y > canvas.height){
            finalBossShotList.splice(i,1);
        }
    }
}

function moveBadGuys(){

    for(let i = 0; i < badGuyList.length; i ++){

        // 0 = no movment
        // 1 = up
        // 2 = down
        // 3 = left
        // 4 = right
        if(badGuyList[i].direction === 0){

            badGuyList[i].chanceMoveCounter ++;

            if(badGuyList[i].chanceMoveCounter > FPS){
                badGuyList[i].chanceMoveCounter = 0;
                if(Math.random() < badGuyInfo.moveChangeChanceVertical){
                    badGuyList[i].direction = Math.round(Math.random() * (2-1) + 1);
                }
                if(Math.random() < badGuyInfo.moveChangeChanceHorizontal){
                    badGuyList[i].direction = Math.round(Math.random() * (4-3) + 3);
                }
            }
        }

        let movment = 0;

        // going up =======================
        if(badGuyList[i].direction === 1){
            movment = badGuyInfo.speed * deltaTime;
            badGuyList[i].y -= movment;
            badGuyList[i].movmentChange += movment;

            if(badGuyList[i].movmentChange > badGuyInfo.maxMovmentDistance){
                badGuyList[i].movmentChange = 0;
                badGuyList[i].direction = 0;
            }

            if(badGuyList[i].y < 0){
                badGuyList[i].y = 0;
                badGuyList[i].direction = 0;
            }
        }

        // going down =======================
        if(badGuyList[i].direction === 2){
            movment = badGuyInfo.speed * deltaTime;
            badGuyList[i].y += movment;
            badGuyList[i].movmentChange += movment;

            if(badGuyList[i].movmentChange > badGuyInfo.maxMovmentDistance){
                badGuyList[i].movmentChange = 0;
                badGuyList[i].direction = 0;
            }

            if(badGuyList[i].y > (canvas.height / 2) - badGuyInfo.destImage.height){
                badGuyList[i].y = (canvas.height / 2) - badGuyInfo.destImage.height;
                badGuyList[i].direction = 0;
            }
        }

        // going left =======================
        if(badGuyList[i].direction === 3){
            badGuyList[i].frame = 2;
            movment = badGuyInfo.speed * deltaTime;
            badGuyList[i].x -= movment;
            badGuyList[i].movmentChange += movment;

            if(badGuyList[i].movmentChange > badGuyInfo.maxMovmentDistance){
                badGuyList[i].movmentChange = 0;
                badGuyList[i].direction = 0;
                badGuyList[i].frame = 0;
            }

            if(badGuyList[i].x < 0){
                badGuyList[i].x = 0;
                badGuyList[i].direction = 0;
                badGuyList[i].frame = 0;
            }
        }

        // going right =======================
        if(badGuyList[i].direction === 4){
            badGuyList[i].frame = 1;
            movment = badGuyInfo.speed * deltaTime;
            badGuyList[i].x += movment;
            badGuyList[i].movmentChange += movment;

            if(badGuyList[i].movmentChange > badGuyInfo.maxMovmentDistance){
                badGuyList[i].movmentChange = 0
                badGuyList[i].direction = 0;
                badGuyList[i].frame = 0;
            }

            if(badGuyList[i].x > canvas.width - badGuyInfo.destImage.width){
                badGuyList[i].x = canvas.width - badGuyInfo.destImage.width;
                badGuyList[i].direction = 0;
                badGuyList[i].frame = 0;
            }
        }

        // shooting 
        badGuyList[i].chanceShotCounter ++;
        if(badGuyList[i].chanceShotCounter > FPS){
            badGuyList[i].chanceShotCounter = 0;

            if(Math.random() < badGuyInfo.shootChance){
                createBadGuyShot(badGuyList[i].x +(badGuyInfo.destImage.width/2),badGuyList[i].y + badGuyInfo.destImage.height);
                createShotEffect(badGuyList[i].x +(badGuyInfo.destImage.width/2) - (shotEffectInfo.destImage.width/2),
                                 badGuyList[i].y + badGuyInfo.destImage.height);

            }
        }
    }
}

function moveFinalBoss(){
    // 0 = no movment
    // 1 = up
    // 2 = down
    // 3 = left
    // 4 = right
    if(finalBossInfo.direction === 0){

        finalBossInfo.chanceMoveCounter ++;

        if(finalBossInfo.chanceMoveCounter > FPS){
            finalBossInfo.chanceMoveCounter = 0;
            if(Math.random() < badGuyInfo.moveChangeChanceVertical){
                finalBossInfo.direction = Math.round(Math.random() * (2-1) + 1);
            }
            if(Math.random() < badGuyInfo.moveChangeChanceHorizontal){
                finalBossInfo.direction = Math.round(Math.random() * (4-3) + 3);
            }
        }
    }

    let movment = 0;

    // going up =======================
    if(finalBossInfo.direction === 1){
        movment = finalBossInfo.speed * deltaTime;
        finalBossInfo.y -= movment;
        finalBossInfo.movmentChange += movment;

        if(finalBossInfo.movmentChange > finalBossInfo.maxMovmentDistance){
            finalBossInfo.movmentChange = 0;
            finalBossInfo.direction = 0;
        }

        if(finalBossInfo.y < 0){
            finalBossInfo.y = 0;
            finalBossInfo.direction = 0;
        }
    }

    // going down =======================
    if(finalBossInfo.direction === 2){
        movment = finalBossInfo.speed * deltaTime;
        finalBossInfo.y += movment;
        finalBossInfo.movmentChange += movment;

        if(finalBossInfo.movmentChange > finalBossInfo.maxMovmentDistance && finalBossReady){
            finalBossInfo.movmentChange = 0;
            finalBossInfo.direction = 0;
        }

        if(!finalBossReady && finalBossInfo.y > 0){
            finalBossReady = true;
        }

        if(finalBossInfo.y > (canvas.height / 2) - finalBossInfo.height){
            finalBossInfo.y = (canvas.height / 2) - finalBossInfo.height;
            finalBossInfo.direction = 0;
        }
    }

    // going left =======================
    if(finalBossInfo.direction === 3){
        finalBossInfo.frame = 2;
        movment = finalBossInfo.speed * deltaTime;
        finalBossInfo.x -= movment;
        finalBossInfo.movmentChange += movment;

        if(finalBossInfo.movmentChange > finalBossInfo.maxMovmentDistance){
            finalBossInfo.movmentChange = 0;
            finalBossInfo.direction = 0;
            finalBossInfo.frame = 0;
        }

        if(finalBossInfo.x < 0){
            finalBossInfo.x = 0;
            finalBossInfo.direction = 0;
            finalBossInfo.frame = 0;
        }
    }

    // going right =======================
    if(finalBossInfo.direction === 4){
        finalBossInfo.frame = 1;
        movment = finalBossInfo.speed * deltaTime;
        finalBossInfo.x += movment;
        finalBossInfo.movmentChange += movment;

        if(finalBossInfo.movmentChange > finalBossInfo.maxMovmentDistance){
            finalBossInfo.movmentChange = 0
            finalBossInfo.direction = 0;
            finalBossInfo.frame = 0;
        }

        if(finalBossInfo.x > canvas.width - finalBossInfo.width){
            finalBossInfo.x = canvas.width - finalBossInfo.width;
            finalBossInfo.direction = 0;
            finalBossInfo.frame = 0;
        }
    }

    // shooting 
    finalBossInfo.chanceShotCounter ++;
    if(finalBossInfo.chanceShotCounter > FPS){
        finalBossInfo.chanceShotCounter = 0;

        if(Math.random() < finalBossInfo.shootChance){
            createFinalBossShot(finalBossInfo.x +(finalBossInfo.width/2), finalBossInfo.y + finalBossInfo.height);
            createShotEffect(finalBossInfo.x +(finalBossInfo.width/2) - (shotEffectInfo.destImage.width/2),
                                finalBossInfo.y + finalBossInfo.height);

            createFinalBossShot(finalBossInfo.x +(finalBossInfo.width/6),finalBossInfo.y + (finalBossInfo.height/3)*2);
            createShotEffect(finalBossInfo.x +(finalBossInfo.width/6) - (shotEffectInfo.destImage.width/2),
                                finalBossInfo.y + (finalBossInfo.height/3)*2);

            createFinalBossShot(finalBossInfo.x +((finalBossInfo.width/6)*5),finalBossInfo.y + (finalBossInfo.height/3)*2);
            createShotEffect(finalBossInfo.x +((finalBossInfo.width/6)*5) - (shotEffectInfo.destImage.width/2),
                                finalBossInfo.y + (finalBossInfo.height/3)*2);
        }
    }
}

// move the ship =====================================

function goUp(){
    spaceShipInfo.y -= directions.up * deltaTime;
    
    if(spaceShipInfo.y < 0 && userControl){
        spaceShipInfo.y = 0;
        directions.up = 0;
    }
}

function goRight(){
    spaceShipInfo.x += directions.right * deltaTime;
    
    if((spaceShipInfo.x + spaceShipInfo.destImage.width) > canvas.width){
        spaceShipInfo.x = canvas.width - spaceShipInfo.destImage.width;
        directions.right = 0;
    }
}

function goLeft(){
    spaceShipInfo.x -= directions.left * deltaTime;
    
    if(spaceShipInfo.x < 0){
        spaceShipInfo.x = 0;
        directions.left = 0;
    }
}

function goDown(){
    spaceShipInfo.y += directions.down * deltaTime;

    if((spaceShipInfo.y + spaceShipInfo.destImage.height) > body.offsetHeight){
        spaceShipInfo.y = body.offsetHeight - spaceShipInfo.destImage.height;
        directions.down = 0;
    }
}

function moveShip(){
    // speed up ===============================
    if(keyPress.up && directions.up < spaceShipInfo.maxSpeed){
        directions.up += spaceShipInfo.speedUp * deltaTime;
        if(directions.up > spaceShipInfo.maxSpeed){
            directions.up = spaceShipInfo.maxSpeed;
        }
    }

    if(keyPress.down && directions.down < spaceShipInfo.maxSpeed){
        directions.down += spaceShipInfo.speedUp * deltaTime;
        if(directions.down > spaceShipInfo.maxSpeed){
            directions.down = spaceShipInfo.maxSpeed;
        }
    }

    if(keyPress.right && directions.right < spaceShipInfo.maxSpeed){
        directions.right += spaceShipInfo.speedUp * deltaTime;
        if(directions.right > spaceShipInfo.maxSpeed){
            directions.right = spaceShipInfo.maxSpeed;
        }
    }

    if(keyPress.left && directions.left < spaceShipInfo.maxSpeed){
        directions.left += spaceShipInfo.speedUp * deltaTime;
        if(directions.left > spaceShipInfo.maxSpeed){
            directions.left = spaceShipInfo.maxSpeed;
        }
    }

    // slowdown ====================================

    if(!keyPress.up && directions.up > 0){
        directions.up -= spaceShipInfo.slowDown * deltaTime;
        if(directions.up < 0){
            directions.up = 0;
        }
    }

    if(!keyPress.down && directions.down > 0){
        directions.down -= spaceShipInfo.slowDown * deltaTime;
        if(directions.down < 0){
            directions.down = 0;
        }
    }

    if(!keyPress.right && directions.right > 0){
        directions.right -= spaceShipInfo.slowDown * deltaTime;
        if(directions.right < 0){
            directions.right = 0;
        }
    }

    if(!keyPress.left && directions.left > 0){
        directions.left -= spaceShipInfo.slowDown * deltaTime;
        if(directions.left < 0){
            directions.left = 0;
        }
    }

    
    goUp();
    goDown();
    goLeft();
    goRight();
}

function centerShip(){
    
    let target = (canvas.width/2) - (spaceShipInfo.destImage.width/2);

    if(spaceShipInfo.x < target){
        keyPress.right = true;
        keyPress.left = false;
    }
    if(spaceShipInfo.x > target){
        keyPress.left = true;
        keyPress.right = false;
    }
}

// drawing stuff =========================
function drawShip(){

    if(keyPress.left && !keyPress.right){
        spaceShipInfo.sourceImage.currentFrame = 1;
    }
    else if(keyPress.right && !keyPress.left){
        spaceShipInfo.sourceImage.currentFrame = 2;
    }
    else{
        spaceShipInfo.sourceImage.currentFrame = 0;
    }

    drawSprite(spaceShipInfo);
}

function drawShots(){

    for(let i = 0; i < shotList.length; i++){

        context.fillStyle = _GREEN;
        context.fillRect(shotList[i].x, shotList[i].y, shotInfo.width, shotInfo.height);

    }
}

function drawBadGuyShots(){

    for(let i = 0; i < badGuyShotList.length; i++){

        context.fillStyle = _RED;
        context.fillRect(badGuyShotList[i].x, badGuyShotList[i].y, badGuyShotInfo.width, badGuyShotInfo.height);
    }
}

function drawFinalBossShot(){
    
    for(let i = 0; i < finalBossShotList.length; i++){

        context.fillStyle = _LILA;
        context.fillRect(finalBossShotList[i].x, finalBossShotList[i].y, finalBossShotInfo.width, finalBossShotInfo.height);
    }
}

function drawShotEffects(){

    for(let i = 0; i < shotEffectList.length; i++){

        let data = JSON.parse(JSON.stringify(shotEffectInfo));

        data.img = shotEffectInfo.img;
        data.sourceImage.currentFrame = Math.floor(shotEffectList[i].frame);
        data.x = shotEffectList[i].x;
        data.y = shotEffectList[i].y;

        drawSprite(data);
    }
}

function drawBadGuys(){
    for(let i = 0; i < badGuyList.length; i++){
        
        let data = JSON.parse(JSON.stringify(badGuyInfo));

        data.img = badGuyInfo.img;
        data.sourceImage.currentFrame = badGuyList[i].frame;
        data.x = badGuyList[i].x;
        data.y = badGuyList[i].y;

        drawSprite(data);
    }
}

function drawExplosions(){
    for(let i = 0; i < explosionList.length; i++){

        let data = JSON.parse(JSON.stringify(explosionInfo));

        data.img = explosionInfo.img;
        data.sourceImage.currentFrame = Math.floor(explosionList[i].frame);
        data.x = explosionList[i].x;
        data.y = explosionList[i].y;
        data.destImage.width = explosionList[i].width;
        data.destImage.height = explosionList[i].height;

        drawSprite(data);
    }
}

function drawPickUpEffect(){
    for(let i = 0; i < pickUpEffectList.length; i++){

        let data = JSON.parse(JSON.stringify(pickUpEffectInfo));

        data.img = pickUpEffectInfo.img;
        data.sourceImage.currentFrame = Math.floor(pickUpEffectList[i].frame);
        data.x = pickUpEffectList[i].x;
        data.y = pickUpEffectList[i].y;

        drawSprite(data);
    }
}

function drawAmmoUp(){
    for(let i = 0; i < ammoUpList.length; i++){

        let data = JSON.parse(JSON.stringify(ammoUpInfo));

        data.img = ammoUpInfo.img;
        data.sourceImage.currentFrame = Math.floor(ammoUpList[i].frame);
        data.x = ammoUpList[i].x;
        data.y = ammoUpList[i].y;

        drawSprite(data);
    }
}

function drawHealthUp(){
    for(let i = 0; i < healthUpList.length; i++){

        let data = JSON.parse(JSON.stringify(healthUpInfo));

        data.img = healthUpInfo.img;
        data.sourceImage.currentFrame = Math.floor(healthUpList[i].frame);
        data.x = healthUpList[i].x;
        data.y = healthUpList[i].y;

        drawSprite(data);
    }
}

function drawFireRateUp(){
    for(let i = 0; i < fireRateUpList.length; i++){

        let data = JSON.parse(JSON.stringify(fireRateUpInfo));

        data.img = fireRateUpInfo.img;
        data.sourceImage.currentFrame = Math.floor(fireRateUpList[i].frame);
        data.x = fireRateUpList[i].x;
        data.y = fireRateUpList[i].y;

        drawSprite(data);
    }
}

function drawFire(){
    if(keyPress.up){
        if(fireInfo.sourceImage.currentFrame < fireInfo.sourceImage.frameAmount - 1){
            fireInfo.frame += fireInfo.speed * deltaTime;
            fireInfo.sourceImage.currentFrame = Math.floor(fireInfo.frame);

            if(fireInfo.sourceImage.currentFrame > fireInfo.sourceImage.frameAmount - 1){
                fireInfo.sourceImage.currentFrame = fireInfo.sourceImage.frameAmount - 1;
            }
        }

        fireInfo.x = spaceShipInfo.x;
        fireInfo.y = spaceShipInfo.y;

        drawSprite(fireInfo);

    }
    else if(!keyPress.up && fireInfo.sourceImage.currentFrame > 0){
        fireInfo.frame -= fireInfo.speed * deltaTime;
        fireInfo.sourceImage.currentFrame = Math.floor(fireInfo.frame);
        if(fireInfo.sourceImage.currentFrame < 0){
            fireInfo.sourceImage.currentFrame = 0;
            fireInfo.frame = 0;
        }

        fireInfo.x = spaceShipInfo.x;
        fireInfo.y = spaceShipInfo.y;

        drawSprite(fireInfo);
    }

}

function drawErrorMsg(){
    
    let showAmount = 0;

    for(let i = 0; i < errorMsgList.length; i++){

        if(errorMsgList[i].show){
            showAmount ++;
            context.fillStyle = errorMsgList[i].color;
            context.fillRect(errorMsgList[i].x, errorMsgList[i].y, errorMsgSize, errorMsgSize);
        }
    }

    if(showAmount < 1 && !errorEnded){
        
        errorEnded = true;

        bm1Sound.play();
        
        gameStartMsg.interval = setInterval(function(){

            write(gameStartMsg.array[gameStartMsg.index]);
            gameStartMsg.index ++;

            if(gameStartMsg.index >= gameStartMsg.array.length){
                clearInterval(gameStartMsg.interval);
               
                setTimeout(()=>{
                    write('');
                    startGame();
                }, 1000);
            }

        },gameStartMsg.speed);

    }
}

function drawFinalBoss(){

    let showAmount = 0;

    let list = finalBossList[finalBossInfo.frame];


    for(let i = 0; i<list.length; i++){

        if(list[i].show){
            showAmount ++;
            context.fillStyle = list[i].color;
            context.fillRect(list[i].x + finalBossInfo.x, list[i].y + finalBossInfo.y, finalBossInfo.bitSize+1, finalBossInfo.bitSize+1);
        }
    }

    // calculate the percent of damage
    let amountOfTiles = list.length - finalBossInfo.amountOfNull[finalBossInfo.frame];
    let amountOfDestroyedTiles = amountOfTiles - showAmount;
    finalBossInfo.damage = Math.round((amountOfDestroyedTiles / amountOfTiles) * 100);

    // console.log(finalBossInfo.damage);

}

function drawBackground(){

    // draw img 1
    bgcontext.drawImage(backGroundInfo.img, 
                        backGroundInfo.destImage.x, 
                        backGroundInfo.destImage.y,
                        backGroundInfo.destImage.width,
                        backGroundInfo.destImage.height);
    
    // draw img 2
    bgcontext.drawImage(backGroundInfo.img,
                        backGroundInfo.destImage.x, 
                        backGroundInfo.destImage.y - backGroundInfo.canvasHeight,
                        backGroundInfo.destImage.width,
                        backGroundInfo.destImage.height);

}

function startGame(){

    // bm1Sound.play();
    
    userControl = false;

    // get rid of the things not needed anymore 
    errorMsgList = [];

    // set up the background stuff
    backGroundInfo.canvasHeight = background.height;
    backGroundInfo.destImage.height = background.height;
    backGroundInfo.destImage.width = background.width;

    drawBackground();

    shrinkScreenOn = true;
}

function shrinkScreen(){

    let backGroundLeft = background.offsetLeft+86;

    canvas.width -= shrinkScreenSpeed * deltaTime;
    keyPress.space = false;

    canvas.style.left = `${canvas.offsetLeft + shrinkScreenSpeed * deltaTime}px`;


    if(canvas.width < gameWidth){
        canvas.width = gameWidth;
    }

    if(canvas.offsetLeft > backGroundLeft){
        canvas.style.left = `${backGroundLeft}px`;
    }

    if(canvas.width === gameWidth && canvas.offsetLeft === backGroundLeft){
            // slide in the background from the top
        backgroundHolder.style.visibility = 'visible';
        backgroundHolder.style.transform = `translateY(0)`;
        shrinkScreenOn = false;

        

        setTimeout(()=>{
            // set the game started flag
            gameStarted = true;
            userControl = true;

            keyPress.left = false;
            keyPress.right = false;

            shotInfo.rate = 2;
            writeFireRate(shotInfo.rate);

        }, backGroundInfo.slideDownTime);
    }
}

function spaceShipDestroyed(){
    explosionSound.play();
    loseSound.play();
    bm1Sound.stop();
    createExplosion(spaceShipInfo.x + spaceShipInfo.destImage.width/2 , spaceShipInfo.y + spaceShipInfo.destImage.height/2,5);
    write('You lose!');
    writeHealth(0);
    spaceShipInfo.show = false;
    gameLost = true;
    userControl = false;
}

function finalBossDestroyed(){

    finalBossDead = true;

    userControl = false;

    bm1Sound.stop();
    wonSound.play();

    let temp = [];
    // create a clean array of the boss
    for(let i = 0; i < finalBossList[0].length; i++){

        if(finalBossList[0][i]){
            if(finalBossList[0][i].show){
                temp.push(finalBossList[0][i]);
            }
        }
    }

    finalBossList[0] = temp;
    
    // write('you won');
    
    destroyRestOfFinalBoss();

}

function destroyRestOfFinalBoss(){

    let index = Math.round(Math.random() * (finalBossList[0].length-1));

    if(finalBossList[0][index]){
        // explosionSound.play();
        createExplosion(finalBossList[0][index].x + finalBossInfo.x + (finalBossInfo.bitSize/2),
                        finalBossList[0][index].y + finalBossInfo.y + (finalBossInfo.bitSize/2),
                        2);
    
        finalBossList[0].splice(index,2);
    }


    if(finalBossList[0].length > 0){
        // console.log(finalBossList[0].length);
        setTimeout(()=>{
            destroyRestOfFinalBoss();
        },30);
    }
    
    if(finalBossList[0].length < 300){

        spaceShipInfo.maxSpeed = 800;
        spaceShipInfo.speedUp = 800;
        keyPress.up = true;

        setTimeout(()=>{
        
            window.cancelAnimationFrame(gameLoop);
            
            gameEnd = true;
            gameStarted = false;
        
        },2200);
    }
}

// clear the screen
function clearScreen(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

function clearBackground(){
    bgcontext.clearRect(0,0,background.width,background.height);
}

// function to draw a sprite
function drawSprite(sprite){
    context.drawImage(
        sprite.img,
        0,
        sprite.sourceImage.height / sprite.sourceImage.frameAmount * sprite.sourceImage.currentFrame,
        sprite.sourceImage.width,
        sprite.sourceImage.height / sprite.sourceImage.frameAmount,
        sprite.x,
        sprite.y,
        sprite.destImage.width,
        sprite.destImage.height
    );
}

function checkHits(){
    if(!gameLost){
        checkErrorMsgHit();

        if(!finalBossFight){
            checkBadGuyDestroy();
        }
        else{
            
            if(finalBossReady){
                checkFinalBossHit();
            }

            if(!finalBossDead){
                checkShitHitFinalBoss();
                checkFinalBossShotHit();
            }
        }

        checkAmmoUpPickUp();
        checkHealthUpPickUp();
        checkFireRateUpPickUp();
        checkShipDestroy();
        checkShipHitBadGuy();
    }
}

function movements(){
    if(gameStarted){
        moveBackground();

        if(!finalBossFight){
            moveBadGuys();
            moveBadGuyShot();
            spawnBadGuy();
        }
        else{

            moveFinalBossShot();
            
            if(!finalBossDead){
                moveFinalBoss();
            }
        }

        moveAmmoUp();
        moveHealthUp();
        moveFireRateUp();
        movePickUpEffect();
    }

    if(shrinkScreenOn){
        shrinkScreen();
    }

    if(!userControl){
        centerShip();
    }

    if(spaceShipInfo.show){
        moveShip();
    }

    moveShots();
    moveShotEffect();
    moveExplosions();
}

// main draw function
function draw(){
    clearScreen();

    if(gameStarted){

        clearBackground();
        drawBackground();
        
        if(!finalBossFight){
            drawBadGuys();
            drawBadGuyShots();
        }
        else{
            drawFinalBossShot();
            drawFinalBoss();
        }

        drawAmmoUp();
        drawHealthUp();
        drawFireRateUp();
        drawPickUpEffect();
    }

    if(!gameStarted){
        drawErrorMsg();
    }

    drawShots();
    
    if(spaceShipInfo.show){
        drawShip();
        drawFire();
    }
    
    drawExplosions();

    drawShotEffects();
}



// main game loop
function gameLoop(timeStamp){

    // Calculate how much time has passed
    deltaTime = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    
    if(!gamePause){
        checkHits();
        movements();
        draw();
    }

    if(!gameEnd){

        window.requestAnimationFrame(gameLoop);
    }
    else{
        clearBackground();
        clearScreen();
        backgroundHolder.style.visibility = 'hidden';
        endMsg.style.display = 'block';
    }

    if(!document.hasFocus()){
        pauseGame();
    }

    // clalculate fps
    FPSFrames ++;
    if(timeStamp > FPSprevTime + 1000){
        FPS = Math.round((FPSFrames * 1000) / (timeStamp - FPSprevTime));
        FPSprevTime = timeStamp;
        FPSFrames = 0;

        // writeFPS(FPS);
    }
}

// piskel gives the color in revers order then what js needs
function reverseColor(srt){
    return srt.match(/.{1,2}/g).reverse().join('');
}

// create the error message
function createErrorList(list){

    errorMsgSize = list.bitSize;

    for(let i = 0; i < list.array.length; i ++){
        
        if(list.array[i] != 0){
            errorMsgList.push({
                x: (i - (Math.floor(i/list.width)*list.width)) * errorMsgSize,
                y: Math.floor(i/list.width) * errorMsgSize,
                show:true,
                color: `#${reverseColor(list.array[i].toString(16))}`
            });
        }
    }


    // calculate middle of screen
    errorMsgX = (body.offsetWidth / 2) - (list.width * errorMsgSize / 2);

    for(let i = 0; i < errorMsgList.length; i++){

        errorMsgList[i].y += errorMsgY;
        errorMsgList[i].x += errorMsgX;
    }
}

function createFinalBossList(list){

    finalBossInfo.bitSize = list.bitSize;
    finalBossInfo.width = list.width * list.bitSize;
    finalBossInfo.height = list.height * list.bitSize;

    let temp = [];
    let amountOfNull = 0;

    for(let i = 0; i < list.array.length; i ++){
        
        temp = [];
        amountOfNull = 0;

        for(let ii = 0; ii < list.array[i].length; ii ++){
            
            let show = true;

            if(list.array[i][ii] === 0){
                show = false;
                amountOfNull ++;
            }
            
            temp.push({
                x: (ii - (Math.floor(ii/list.width)*list.width)) * list.bitSize,
                y: Math.floor(ii/list.width) * list.bitSize,
                show: show,
                color: `#${reverseColor(list.array[i][ii].toString(16))}`
            });
        }
        finalBossList.push(temp);
        finalBossInfo.amountOfNull.push(amountOfNull);
    }
}

function pauseGame(){
    if(gameStarted){

        bm1Sound.pause();

        gamePause = true;
    
        write('pause');
    }
}

function unPauseGame(){
    if(gameStarted){

        bm1Sound.play();

        gamePause = false;
    
        write('');

    }
}

function togglePause(){
    if(gamePause){
        unPauseGame();
    }
    else{
        pauseGame();
    }
}

function write(msg){
    winMsg.innerHTML = msg.replace(/ /g,'!');
}

function writeFPS(fps){
    fpsLable.innerHTML = fps;
}

function padOut(left,right,amount){

    let space = '';

    for(let i = left.length+right.length;i<amount;i++){
        space = space + '!';
    }

    return `${left}${space}${right}`;
}

function writeAmmo(amount){

    line2.innerHTML = padOut('ammo',`${amount}`,10);
}

function writeHealth(amount){
    
    line1.innerHTML = padOut('hp',`${amount}`,10);

    healthBar.style.width = `${amount}%`;

            if(spaceShipInfo.health < 30){
                healthBar.style.backgroundColor = _RED;
            }
            else if(spaceShipInfo.health < 50){
                healthBar.style.backgroundColor = _YELLOW;
            }
            else{
                healthBar.style.backgroundColor = _GREEN;
            }
}

function writeEnemyDown(amount){

    line3.innerHTML = padOut('enmy',`${amount}`,10);

}

function writeFireRate(amount){
    
    line4.innerHTML = padOut('f-rate',`${amount}`,10);

}

function youWin(){
    write("Ok, I think that's enough.<br>Now go enter the right url.");
}


// initialization
function init(){

    // create the error message stuff 
    createErrorList(fourOhfourArray);
    //createErrorList(BBWArray);

    createFinalBossList(finalBoss);

    writeAmmo(spaceShipInfo.ammo);
    writeFireRate(shotInfo.rate);

    // get the canvas and 2d context
    canvas = document.querySelector('.gameCanvas');
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;
    context = canvas.getContext('2d');

    background.width = gameWidth + 80 + 94;
    background.height = body.offsetHeight;
    bgcontext = background.getContext('2d');

    // get the game running
    window.requestAnimationFrame(gameLoop);
}


init();

