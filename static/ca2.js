
# vamgame
let canvas;
let context;
let request_id;

let fpsInterval = 100/30;
let now;
let then = Date.now();

let backgroundImage= new Image();
let shooting = false;

let tilesPerRow = 8;
let tileSize = 16;

let ball_kil_mon = false;
//512/16 = 32 
//320/16 = 20 images down 
//14 in the pic , mine should be 20
let background = [

/*0*/     [38,38,38,-1,-1,-1,-1,-1,31,38,-1, 5, 4, 4, 4, 4, 4, 4, 4, 5,-1,-1,-1,20,-1,40,41,41,41,41,42,12],
/*1*/     [38,38, 1, 2, 2, 2, 2, 1,-1,-1,38, 5,55, 8, 8, 8, 8,54,53, 5,-1,-1,-1,-1,-1,15,15,15,15,15,15,12],
/*2*/     [-1,27, 1,16,16,16,16, 1,20,-1,-1, 5, 8, 8, 8, 8, 8, 8, 8, 5,-1,-1,-1,-1,-1,15,15,15,15,15,15,12],
/*3*/     [38,-1, 1,16,16,16,16, 1,-1,30,-1, 5, 8, 8, 8, 8, 8, 8, 8, 5,-1,-1,-1,-1,-1,15,15,50,15,15,15,12],
/*4*/     [62,-1, 1,16,16,16,16, 1,-1,-1,-1, 5, 8, 8, 8, 8, 8, 8, 8, 5,-1,-1,-1,-1,-1,27,-1,27,-1,27,-1,12],
/*5*/     [62,-1, 0, 0, 0,16, 0, 0,20,-1,-1, 4, 4, 4, 4, 8, 4, 4, 4, 4,-1,-1,-1,-1,-1,12,19,12,58,-1,-1,-1],
/*6*/     [-1,-1,-1,-1,-1,10,-1,30,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*7*/     [-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*8*/     [38,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,-1,24,25,25,25],
/*9*/     [59,59,59,59,59,10,-1,-1,28,-1,-1,-1,-1,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,24,-1,-1,-1,-1],
/*10*/    [59,66,66,66,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,40,41,41,41,41],
/*11*/    [59,66,66,66,59,10,-1,-1,-1,-1,-1,-1,-1,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*12*/    [59,66,66,66,59,10,-1,-1,-1,-1,-1,-1,-1,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*13*/    [59,66,66,66,59,10,-1,-1,-1,-1,-1,-1,-1,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*14*/    [59,59,59,59,59,10,-1,-1,-1,-1,-1,-1,-1,10,10,10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*15*/    [38,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*16*/    [10,10,10,10,10,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*17*/    [38,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*18*/    [38,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
/*19*/    [38,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
]

let walkArea = [-1,10];
//check_tile(walkArea);
let player={
    x : 0,
    y : 150,
    width : 31.92,
    height : 48,
    frameX : 0,
    frameY : 0,
    xChange : 0,
    yChange : 0
};

let level = 1;

let bloods= [];

let b = {
    x : -5,
    y : -5,
    size : 5,
    xChange : 0,
    yChange : 0
}
let contains;
let playerImage = new Image();

let temporaryValues = false;

let temporaryWidthValue;
let temporaryHeightValue;
let temporaryXValue;
let temporaryYValue;
let CanMoveRight;
let CanMoveLeft ;
let CanMoveUp ;
let CanMoveDown ;

let monImage = new Image();;
let floorT;
let floorR;
let floorL;
let floorD;
let space = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let hideKey = false;

let monsters = [];
let num_of_mon = 1;
let player_points = 100;
let mon_points =100;
let mon_pointsChange = 10;
let player_pointsChange = 10;

let num_killed_player = 0;
let audioShooting;
let num_killed_mon = 0;
let start = new Audio('../static/starting.mp3');

let shootingS = new Audio('../static/shooting.mp3');
let mk = new Audio('../static/mk.mp3');
let hideSound = new Audio('../static/hide.mp3');
let levelSound = new Audio('../static/level.mp3');

let xhttp;
let number = 0;
document.addEventListener("DOMContentLoaded", init, false);//do not call the init function until the the tree has finished 
function init() {

    canvas = document.querySelector("canvas"); //call the canvas in html 
    context = canvas.getContext("2d"); //the artist 
    load_images(["../static/player.png", "../static/mon.png","../static/backg.png"]);
    playerImage.src = "../static/player.png";
    monImage.src = "../static/mon.png";
    backgroundImage.src = "../static/backg.png";
    floorD = canvas.height-27;
    floorT = 0;
    floorR = canvas.width-27;
    floorL = 0 ;
    player.x = canvas.width/2;
    player.y = floorD - player.height;
    /* here where I tried to insert the tiles to the list andd so first I tried with 28 to get it working and then I can append the other
    let tileSize = 16;
    for (let r = 0; r < 20; r +=1){
        for (let c = 0; c <32; c += 1){
            let tile = background[r][c];
            if (tile ===28){
                let tileInfo = {
                    x : c* tileSize,
                    y : r*tileSize,
                    size : tileSize
                }
                //console.log(tileInfo)
                objsList.push(tileInfo);
            }*/
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    draw();

}

async function load_images(urls) {
    let promises = [];
    for (let url of urls) {
        promises.push(new Promise((resolve) => {
            let img = new Image();
            img.onload = resolve;
            img.src = url;
        }));
    }
    await Promise.all(promises); 
}

function draw(){
    request_id= window.requestAnimationFrame(draw);

    //the speed of animation depends on the pc 
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed<= fpsInterval){
        return;
    }
    then = now - (elapsed % fpsInterval);
    create_mon(num_of_mon);

    context.clearRect(0,0,canvas.width, canvas.height);

    context.fillStyle = "#9ACD32";
    context.fillRect(0,0,canvas.width, canvas.height);
    for (let r = 0; r < 20; r +=1){
        for (let c = 0; c <32; c += 1){
            let tile = background[r][c];
            if (tile >= 0){
                let tileRow = Math.floor(tile / tilesPerRow); //38/9 = 4
                let tileCol = Math.floor(tile % tilesPerRow); //38%8 = 6
                context.drawImage(backgroundImage, 
                    tileCol * tileSize ,tileRow* tileSize,tileSize,tileSize,//extract from the sprite 
                    c * tileSize, r * tileSize , tileSize, tileSize);//where you want to draw it of the top left, and how wide and how hight it will be
            }
        }
    }

//Draw player
    context.drawImage(playerImage, 
        player.frameX * player.width,player.frameY * player.height,player.width, player.height,
        player.x, player.y, player.width, player.height);
    //Draw Enemies

    if (moveLeft || moveRight || moveDown || moveUp){
        player.frameX = (player.frameX +1) % 4;
    }
    for (let mon of monsters){
        context.drawImage(monImage, 
            mon.frameX * mon.width,mon.frameY * mon.height,mon.width, mon.height,
            mon.x, mon.y, mon.width, mon.height);
    }
    //check_tile(objsList, player); here where I called the checktile function 
    if (moveRight){
        player.xChange = player.xChange + 0.2;
        player.frameY = 2;
        for (let mon of monsters){
        mon.frameY = 2;
        }
        
    }
    if (moveLeft){
        player.xChange = player.xChange - 0.2;
        player.frameY = 1;
        for (let mon of monsters){
        mon.frameY = 1;
        }
    }  
    if (moveUp){
        player.yChange= player.yChange - 0.2;
        player.frameY = 3;
        for (let mon of monsters){
        mon.frameY = 3;
        }
        
    }
    if (moveDown){
        player.yChange = player.yChange + 0.2;
        player.frameY = 0;
        for (let mon of monsters){
        mon.frameY = 0;
        }
        
        

    }
    //hide the player not resetting it to its normal alues after being true     
    if (hideKey){
        hideSound.play();
        if (temporaryValues===false){
            temporaryYValue = player.y;
            temporaryXValue = player.x;
            temporaryWidthValue = player.width;
            temporaryHeightValue = player.height;

            temporaryValues = true;
        }
        player.width = 0;
        player.height = 0;
        player.x = 0;
        player.y = 0;
    }else{
        if (temporaryValues === true){
            player.x =temporaryXValue;
            player.y = temporaryYValue;
            player.width =temporaryWidthValue ;
            player.height = temporaryHeightValue ;
            player.x = player.x +player.xChange;
            player.y = player.y + player.yChange;
            temporaryValues=false;

        }
    }

    //update the player and mon
    context.fillStyle = "red";
    context.fillRect(b.x , b.y , b.size , b.size)


    if (space){
        shootingS.play();
        //let element = document.querySelector(".kill_mon");
        if (shooting === false && player.frameY === 2){      
            b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : 10,
            yChange : 0
        }
        shooting = true;
        }if (shooting === false && player.frameY === 1){
            b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : -10,
            yChange : 0
        }
        shooting = true;
        }if (shooting === false && player.frameY === 3){
            b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : 0,
            yChange : -10
        }
        shooting = true;
        }if (shooting === false && player.frameY === 0){
            b = {
            x : player.x,
            y : player.y,
            size : 5,
            xChange : 0,
            yChange : 10
        }
        shooting = true;
        }
    }
    else{
        shooting = false;
    }
    /* this function to check if the player killed the monster , b is the ball that if it coliides with the mon that count as taking one from the mon health which is 10 so 10-1 for every hit  */
    for (let mon of monsters){
        if ( kil_mon(mon,b)){
            b.x = -45;
            b.y = -45;
            //console.log(mon_points);
            if (mon_points === 0){
                mk.play();
                //blood(mon);
                if (nextLeverl()){
                    level = level +1;
                    number = number + 1
                    let level_sentence = "you win " + level +" level";
                    mon.x =0;
                    mon.y =0; 
                    mon_points = 100;
                    num_of_mon = num_of_mon + number;
                    number = 1;
                    num_killed_mon = num_killed_mon +1;
                    let sentence_from_player = "you have killed " + num_killed_mon + " monsters"
                    num_of_mon_player_killed(sentence_from_player);
                    levelMessage(level_sentence);

                }else{
                    levelSound.play();

                    number = number + 1
                    let level_sentence = "you win " + level +" level";
                    mon.x =0;
                    mon.y =0; 
                    mon_points = 100;
                    num_of_mon = num_of_mon + number;
                    number = 1;
                    num_killed_mon = num_killed_mon +1;
                    let sentence_from_player = "you have killed " + num_killed_mon + " monsters"
                    num_of_mon_player_killed(sentence_from_player);
                    levelMessage(level_sentence);
                    stop("game over!")
                }
            }else{
                let mon_pointsSentence = "monster health "+ mon_points + "%";
                mon_points = mon_points - mon_pointsChange;
                mon_display_health(mon_pointsSentence);

            }

        } else{
            b.x = b.x + b.xChange;
            b.y = b.y + b.yChange;
        }
    }

    for (let mon of monsters){
    if (mon.x + mon.width < player.x +(player.width/5) ){
        mon.xChange = mon.xChange+0.05;
    }
    if (mon.x > player.x +(player.width/1.8)){
        mon.xChange = mon.xChange- 0.03;
    } if (mon.y > player.y+(player.height/2)){
        mon.yChange = mon.yChange- 0.03;
    } if (mon.y -(mon.height/1.8)< player.y-player.height+1){
        mon.yChange = mon.yChange+ 0.03;
    }
    }
    
    for (let mon of monsters){
        if (player_collides(mon,player)) {
            mon.y = mon.y - randint(60, 75);
            mon.x = mon.x - randint(60, 75);
            if (player_points === 0){
                num_killed_player = num_killed_player +1;
                let sentence_from_mon= "monster has killed you " + num_killed_player + " times";
                num_of_players_mon_killed(sentence_from_mon);
                player_points = 100;
    
            }else{
                let player_pointsSentence = "Your health "+ player_points + "%";
                player_points = player_points - player_pointsChange;
                player_display_health(player_pointsSentence);

    
            }
        }
    }

    player.x = player.x +player.xChange;
    player.y = player.y + player.yChange;
    for (let mon of monsters){
    mon.x = mon.x +mon.xChange;
    mon.y = mon.y +mon.yChange;
    }

    player.xChange = player.xChange *0.9;
    player.yChange = player.yChange *0.9;
    for (let mon of monsters){

    mon.xChange = mon.xChange *0.9;
    mon.yChange = mon.yChange *0.9;
    }
    
    if (player.y +player.height > floorD){
        player.y = floorD - player.height;
        player.yChange = 0;
    }else if(player.y < floorT){
        player.y = 0;
    } if(player.x < floorL){
        player.x = 0;
    }else if(player.x +player.width> floorR){
        player.x = floorR-player.width;
    }
    for (let mon of monsters){

    if (mon.y +mon.height > floorD){
        mon.y = floorD - mon.height;
        mon.yChange = 0;
    }else if(mon.y < floorT){
        mon.y = 0;
    } if(mon.x < floorL){
        mon.x = 0;
    }else if(mon.x +mon.width> floorR){
        mon.x = floorR-mon.width;
    }
    }
    
}


function create_mon(num_of_mon){ 
    if (monsters.length <num_of_mon){
        let mon = {
            x : canvas.width,
            y : randint(0,canvas.height),
            width : 31.92,
            height : 48,
            frameX : 0,
            frameY : 0,
            xChange : 0,
            yChange : 0
        };
        monsters.push(mon);
    }

}
function player_collides(mon,player) {
    if (mon.x + mon.width < player.x +(player.width/5) ||
        (mon.x > player.x +(player.width/1.8)) ||
        (mon.y > player.y+(player.height/2)) ||
        (mon.y -(mon.height/1.8)< (player.y-player.height)+1)) {
        return false;
    } else {
        return true;
    }
}



function activate(event){
    let key = event.key;
    if (key==="ArrowLeft"){
        moveLeft = true;
    }else if (key === "ArrowUp"){
        moveUp =true;
    }else if (key === "ArrowRight"){
        moveRight = true;
    }else if(key === "ArrowDown"){
        moveDown = true;
    }else if(key === " "){
        space = true;
    }else if (key === "q"){
        hideKey = true;
    }
}
function deactivate(event){
    let key = event.key;
    if (key==="ArrowLeft"){
        moveLeft = false;
    }else if (key === "ArrowUp"){
        moveUp =false;
    }else if (key === "ArrowRight"){
        moveRight = false;
    }else if(key === "ArrowDown"){
        moveDown = false;
    }else if(key === " "){
        space = false;
    }else if (key === "q"){
        hideKey = false;
    }
}


function kil_mon(mon,b){
    if (mon.x+ mon.width <b.x||
        b.x +b.size < mon.x ||
        mon.y > b.y+ b.size||
        b.y> mon.y + mon.width){
        return false;
    }else{
        return true;
    }
}

function randint(min,max) {
    return Math.round(Math.random() * (max-min)) + min;
}

function levelMessage (outcome){
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome;

}


function player_display_health(player_points){
    let player_points_element = document.querySelector("#player_points");
    player_points_element.innerHTML = player_points;
}
function mon_display_health(mon_points){
    let mon_points_element = document.querySelector("#mon_points");
    mon_points_element.innerHTML = mon_points;
}
function nextLeverl(){
    let nextLevelSem = confirm("Continue to next level?");
    if (nextLevelSem === false){
        return false;
    }else{
        return true;
    }
}

/* THIS IS the function where I tried to do the coliision betwen the player and the tile but it stop 
when the player hit the tile.
function check_tile(objsList, player){

    for (let tile of objsList){
        //console.log("tile x", tile.x)
        //console.log("tile y",tile.y)
        //console.log("playerx", player.x)
        //console.log("playery", player.y)

        
        if ((player.x + player.width>=tile.x) &&(moveRight) && (tile.y<=player.y) && (player.y <= tile.y+tile.size )){
            player.x = player.x -16;

        } 
        if ((tile.x +tile.size >= player.x ) &&(moveLeft) && (tile.y<=player.y) && (player.y <= tile.y+tile.size )){
            player.x = player.x +16;
        }
        if((player.y < tile.y+ tile.size)&& (moveUp)&& (tile.x<=player.x) && (player.x <= tile.x+tile.size )){
            player.y = player.y +16;


        }if((player.y+ player.height > tile.y)&& (moveDown)&& (tile.x<=player.x) && (player.x <= tile.x+tile.size )){
            player.y = player.y -16;


        }
    }
}*/
function num_of_mon_player_killed(sentence_from_player){
    let sentence_from_player_element = document.querySelector("#sentence_from_player");
    sentence_from_player_element.innerHTML = sentence_from_player;
}
function num_of_players_mon_killed(sentence_from_mon){
    let sentence_from_mon_element = document.querySelector("#sentence_from_mon");
    sentence_from_mon_element.innerHTML = sentence_from_mon;
}

function stop(end){

    window.removeEventListener("keydown",activate,false);
    window.removeEventListener("keyup",deactivate,false);
    window.cancelAnimationFrame(request_id);
    let end_element = document.querySelector("#end");
    end_element.innerHTML = end; 
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "store_scores", true);
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({"num_killed_player": num_killed_player, "num_killed_mon": num_killed_mon,"level":level })); 


}
function handle_response(){
    if (xhttp.readyState === 4){
        if (xhttp.status === 200){
            if (xhttp.responseText === "success"){
                return "score successfuly saved"
            }else{
                return "sory we couldn't save your game details, try again"

            }
        }
    }
}
