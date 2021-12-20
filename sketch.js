var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacletop,obsTop1,obsTop2
var obstaclebottom,obsBottom1,obsBottom2,obsBottom3
var PLAY=1
var END=0
var gamestate=PLAY
var gameover,gameoverImg
var restart,restartImg
var score=0
var topobstacleGroup
var bottomobstacleGroup
var barGroup
var bgImg2
function preload(){
bgImg = loadImage("assets/bg.png")
bgImg2 = loadImage("assets/bgImg2.jpg")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsTop1=loadImage("assets/obsTop1.png")
obsTop2=loadImage("assets/obsTop2.png")
obsBottom1=loadImage("assets/obsBottom1.png")
obsBottom2=loadImage("assets/obsBottom2.png")
obsBottom3=loadImage("assets/obsBottom3.png")
gameoverImg=loadImage("assets/gameOver.png")
restartImg=loadImage("assets/restart.png")
}

function setup(){

//background image
bg = createSprite(165,485,1,1);

getBackgroundImg();
//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.1;

restart=createSprite(220,240)
restart.scale=0.5
restart.addImage(restartImg)
restart.visible=false

gameover=createSprite(220,200)
gameover.addImage(gameoverImg)
gameover.scale=0.5
gameover.visible=false

topobstacleGroup=new Group();
bottomobstacleGroup=new Group();
barGroup=new Group();


}

function draw() {
  
  background("black");
        if(gamestate===PLAY){
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
           Bar();
   spawnobstacleTop();
        spawnobstacleBottom();
        if(topobstacleGroup.isTouching(balloon)||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)||bottomobstacleGroup.isTouching(balloon)){
          gamestate=END
        }
    }
        if(gamestate===END){
        gameover.visible=true
        restart.visible=true
        balloon.velocityX=0
        balloon.velocityY=0
        topobstacleGroup.setVelocityXEach(0);
        bottomobstacleGroup.setVelocityXEach(0);
        barGroup.setVelocityXEach(0);
        topobstacleGroup.setLifetimeEach(-1);
        bottomobstacleGroup.setLifetimeEach(-1);
        balloon.y=200
        if(mousePressedOver(restart)){
          reset();
          
        
        }
      }
        drawSprites();
Score();
}
function reset(){
  gamestate=PLAY 
  gameover.visible=false
  restart.visible=false
  topobstacleGroup.destroyEach()
  bottomobstacleGroup.destroyEach()
  score=0
}
function Score(){
  if(balloon.isTouching(barGroup)){
    score=score+1
  }
  textFont('algerian')
textSize(30)
fill("yellow");
text("score->"+score,250,50);
}

function spawnobstacleTop(){
  if(World.frameCount%60===0){
obstacletop=createSprite(400,50,40,50);
obstacletop.velocityX=-4
obstacletop.scale=0.1
obstacletop.Y=Math.round(random(10,100))
var rand=Math.round(random(1,2))
switch(rand){
  case 1:obstacletop.addImage(obsTop1)
  break
  case 2:obstacletop.addImage(obsTop2)
  break
  default:break
}
obstacletop.lifetime=100
balloon.depth=balloon.depth+1
topobstacleGroup.add(obstacletop);
  }
}
function spawnobstacleBottom(){
  if(World.frameCount%80===0){
  obstaclebottom=createSprite(400,300,20,10);
  obstaclebottom.velocityX=-4
  obstaclebottom.scale=0.1
  obstaclebottom.Y=Math.round(random(121,200))
  var rand=Math.round(random(1,3))
  switch(rand){
    case 1:obstaclebottom.addImage(obsBottom1)
    break
    case 2:obstaclebottom.addImage(obsBottom2)
    break 
    case 3:obstaclebottom.addImage(obsBottom3)
    break
    default:break
  }
  bottomobstacleGroup.add(obstaclebottom);
}
}

function Bar(){
  if(World.frameCount%60===0){
    var bar=createSprite(400,200,10,800)
    bar.velocityX=-6
    bar.lifetime=70
    bar.visible=false
    barGroup.add(bar)
  }
}
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON=await response.json();
  var datetime=responseJSON.datetime
  var hour=datetime.slice(11,13)
if(hour>=06 && hour<=19){
  bg.addImage(bgImg);
  bg.scale=1.5
}
else {
  bg.addImage(bgImg2);
  bg.x=200
  bg.y=200
  bg.scale=1.5
}
}
 